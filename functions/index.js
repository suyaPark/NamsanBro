const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.secret_key);

admin.initializeApp();

// Create PaymentIntent
exports.createPaymentIntent = functions.https.onCall(async (data, context) => {
  if (!context.auth) throw new functions.https.HttpsError('unauthenticated', 'Must be logged in.');

  const { amount, currency = 'cad', orderId } = data;
  const uid = context.auth.uid;

  // Verify order belongs to user
  const orderRef = admin.firestore().collection('orders').doc(orderId);
  const orderSnap = await orderRef.get();
  if (!orderSnap.exists || orderSnap.data().buyerId !== uid) {
    throw new functions.https.HttpsError('not-found', 'Order not found');
  }

  // Create PaymentIntent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100), // Stripe uses cents
    currency,
    metadata: { orderId, userId: uid }
  });

  // Update order with client_secret
  await orderRef.update({ client_secret: paymentIntent.client_secret });

  return { client_secret: paymentIntent.client_secret };
});

// Webhook to handle payment success
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, functions.config().stripe.webhook_secret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const orderId = paymentIntent.metadata.orderId;

    // Confirm order
    await admin.firestore().collection('orders').doc(orderId).update({
      status: 'confirmed',
      paidAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }

  res.json({ received: true });
});