// src/context/AppContext.jsx
import React, { 
    createContext, 
    useContext, 
    useState, 
    useEffect, 
    useCallback 
} from 'react';
import { 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { 
    collection, 
    doc, 
    onSnapshot,
    query, 
    where, 
    addDoc, 
    setDoc, 
    updateDoc, 
    deleteDoc, 
    serverTimestamp,
    getDoc,
    writeBatch
} from 'firebase/firestore';
import { 
    ref, 
    uploadBytes, 
    getDownloadURL 
} from 'firebase/storage';
import { db, auth, provider, storage } from '../utils/firebase';
import { normalizeAndValidateTiers, getUnitPriceFromTiers, calculateTotalPrice } from '../utils/moqUtils';

// 1. Context Creation and Custom Hook
const AppContext = createContext();
export const useApp = () => useContext(AppContext);

// 2. Provider Component
export const AppProvider = ({ children }) => {
    // --- State Management ---
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isSeller, setIsSeller] = useState(false);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isAuthReady, setIsAuthReady] = useState(false);
    
    // UI State
    const [currentView, setCurrentView] = useState('home');
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Auth Modal State
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('login');
    const [authStep, setAuthStep] = useState('credentials');
    const [authForm, setAuthForm] = useState({ 
        email: '', 
        password: '', 
        confirmPassword: '',
        userType: 'buyer',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        company: '',
        businessRegistration: ''
    });
    const [authLoading, setAuthLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // ✅ 추가

    // --- Authentication Logic ---
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const currentId = firebaseUser.uid;
                setUserId(currentId);
                
                // Get user profile from Firestore
                const profileDocRef = doc(db, 'users', currentId);
                const profileSnap = await getDoc(profileDocRef);

                let profile = {};
                if (profileSnap.exists()) {
                    profile = profileSnap.data();
                } else {
                    // Create basic profile if it doesn't exist
                    profile = { 
                        uid: currentId, 
                        email: firebaseUser.email || '',
                        userType: 'buyer', 
                        status: 'active',
                        createdAt: serverTimestamp()
                    };
                    await setDoc(profileDocRef, profile);
                }

                const fullUser = { 
                    ...firebaseUser, 
                    ...profile, 
                    uid: currentId 
                };
                setUser(fullUser);
                setIsSeller(profile.userType === 'seller' && profile.status === 'active');

                // Load cart data
                fetchCartData(currentId); 

            } else {
                // Anonymous user handling
                const anonymousId = sessionStorage.getItem('anonymousId') || `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
                sessionStorage.setItem('anonymousId', anonymousId);
                setUserId(anonymousId);
                setUser(null);
                setIsSeller(false);
                fetchCartData(anonymousId);
            }
            setIsAuthReady(true);
        });

        return () => unsubscribe();
    }, []);

    // --- Data Fetching ---

    // Products (Public Data)
    useEffect(() => {
        if (!isAuthReady) return;

        const productsQuery = query(
            collection(db, 'products'),
            where('status', '==', 'approved')
        );

        const unsubscribe = onSnapshot(productsQuery, (snapshot) => {
            const productsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(productsData);
        }, (error) => {
            console.error("Error fetching products: ", error);
        });

        return () => unsubscribe();
    }, [isAuthReady]);

    // Cart (User-specific Data)
    const fetchCartData = useCallback((currentId) => {
        if (!currentId || !isAuthReady) return;

        const cartQuery = query(
            collection(db, 'cart'), 
            where('userId', '==', currentId)
        );

        const unsubscribe = onSnapshot(cartQuery, (snapshot) => {
            const cartData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setCart(cartData);
        }, (error) => {
            console.error("Error fetching cart: ", error);
        });

        return unsubscribe;
    }, [isAuthReady]);

    // --- Auth Modal Handlers ---
    const openAuthModal = () => setAuthModalOpen(true);
    const closeAuthModal = () => {
        setAuthModalOpen(false);
        setAuthMode('login');
        setAuthStep('credentials');
        setAuthForm({ 
            email: '', 
            password: '', 
            confirmPassword: '',
            userType: 'buyer',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            city: '',
            province: '',
            postalCode: '',
            company: '',
            businessRegistration: ''
        });
        setShowPassword(false); // ✅ 추가
    };

    // --- Auth Actions ---
    const signInUser = useCallback(async (form) => {
        setAuthLoading(true);
        try {
            await signInWithEmailAndPassword(auth, form.email, form.password);
            closeAuthModal();
        } catch (error) {
            console.error("Sign In Failed:", error);
            alert(`Sign In Failed: ${error.message}`);
        } finally {
            setAuthLoading(false);
        }
    }, []);

    const signUpUser = useCallback(async (form) => {
        setAuthLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
            const newUserId = userCredential.user.uid;

            // Create user profile
            const userProfile = {
                email: form.email,
                userType: form.userType,
                status: form.userType === 'seller' ? 'pending' : 'active',
                firstName: form.firstName,
                lastName: form.lastName,
                phone: form.phone,
                address: form.address,
                city: form.city,
                province: form.province,
                postalCode: form.postalCode,
                company: form.company,
                businessRegistration: form.businessRegistration,
                createdAt: serverTimestamp()
            };

            await setDoc(doc(db, 'users', newUserId), userProfile);
            closeAuthModal();
            alert('Registration Successful!');

        } catch (error) {
            console.error("Sign Up Failed:", error);
            alert(`Registration Failed: ${error.message}`);
        } finally {
            setAuthLoading(false);
        }
    }, []);

    const signInWithGoogle = useCallback(async () => {
        setAuthLoading(true);
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            
            // Check if user profile exists
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (!userDoc.exists()) {
                // Create basic profile for Google user
                const userProfile = {
                    email: user.email,
                    userType: 'buyer',
                    status: 'active',
                    firstName: user.displayName?.split(' ')[0] || '',
                    lastName: user.displayName?.split(' ')[1] || '',
                    phone: '',
                    address: '',
                    city: '',
                    province: '',
                    postalCode: '',
                    company: '',
                    createdAt: serverTimestamp()
                };
                await setDoc(doc(db, 'users', user.uid), userProfile);
            }
            closeAuthModal();
        } catch (error) {
            console.error("Google Sign In Failed:", error);
            alert(`Google Sign In Failed: ${error.message}`);
        } finally {
            setAuthLoading(false);
        }
    }, []);

    const signOutUser = useCallback(async () => {
        try {
            await signOut(auth);
            setCurrentView('home');
        } catch (error) {
            console.error("Sign Out Failed:", error);
            alert(`Sign Out Failed: ${error.message}`);
        }
    }, []);

    // --- Cart Actions ---
    const addToCart = useCallback(async (product, quantity) => {
        if (!userId) {
            alert("Please sign in to add items to cart.");
            openAuthModal();
            return;
        }

        try {
            setLoading(true);
            const existingItem = cart.find(item => item.productId === product.id);
            
            if (existingItem) {
                const newQuantity = existingItem.quantity + quantity;
                await updateCartQuantity(existingItem.id, newQuantity);
            } else {
                const cartItem = {
                    productId: product.id,
                    productName: product.name,
                    moqPrices: product.moqPrices,
                    images: product.images,
                    category: product.category,
                    quantity: quantity,
                    userId: userId,
                    addedAt: serverTimestamp()
                };
                await addDoc(collection(db, 'cart'), cartItem);
            }
            setCurrentView('cart');

        } catch (error) {
            console.error("Add to Cart Failed:", error);
            alert(`Failed to add item to cart: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, [userId, cart]);

    const updateCartQuantity = useCallback(async (cartItemId, newQuantity) => {
        if (newQuantity < 1) {
            await removeFromCart(cartItemId);
            return;
        }

        try {
            const cartItemRef = doc(db, 'cart', cartItemId);
            await updateDoc(cartItemRef, { quantity: newQuantity });
        } catch (error) {
            console.error("Update Cart Quantity Failed:", error);
            alert(`Failed to update quantity: ${error.message}`);
        }
    }, []);

    const removeFromCart = useCallback(async (cartItemId) => {
        try {
            const cartItemRef = doc(db, 'cart', cartItemId);
            await deleteDoc(cartItemRef);
        } catch (error) {
            console.error("Remove from Cart Failed:", error);
            alert(`Failed to remove item: ${error.message}`);
        }
    }, []);

    const checkout = useCallback(async () => {
        if (!user || cart.length === 0) return;

        setLoading(true);
        try {
            const total = cart.reduce((sum, item) => sum + calculateTotalPrice(item.moqPrices, item.quantity), 0);
            
            // IMPORTANT: Create order with pending_payment status
            // Actual payment processing should happen on server with Stripe
            const order = {
                buyerId: user.uid,
                buyerEmail: user.email,
                items: cart.map(item => ({
                    productId: item.productId,
                    productName: item.productName,
                    quantity: item.quantity,
                    unitPrice: getUnitPriceFromTiers(item.moqPrices, item.quantity),
                    totalPrice: calculateTotalPrice(item.moqPrices, item.quantity),
                })),
                totalAmount: total,
                status: 'pending_payment', // Critical: Don't confirm until payment succeeds
                shippingAddress: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    address: user.address,
                    city: user.city,
                    province: user.province,
                    postalCode: user.postalCode
                },
                createdAt: serverTimestamp(),
                currency: 'CAD'
            };

            // Create order document
            const orderRef = await addDoc(collection(db, 'orders'), order);
            
            // Clear cart using batch write for atomicity
            const batch = writeBatch(db);
            cart.forEach(item => {
                batch.delete(doc(db, 'cart', item.id));
            });
            await batch.commit();

            // TODO: Call server function to create Stripe PaymentIntent
            // This should be done via a Cloud Function to keep Stripe keys secure
            alert('Order created! Redirecting to payment...');
            setCurrentView('buyer-orders');

        } catch (error) {
            console.error("Checkout Failed:", error);
            alert(`Checkout Failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, [user, cart]);

    // --- Product Upload Action ---
    const uploadProduct = useCallback(async (productData, images) => {
        if (!user || user.userType !== 'seller' || user.status !== 'active') {
            alert('Only approved sellers can upload products.');
            return;
        }

        setLoading(true);
        try {
            // Upload images with random filenames for security
            const imageUploadPromises = images.map((file, index) => {
                // Generate cryptographically secure random filename
                const randomString = Array.from(crypto.getRandomValues(new Uint8Array(16)))
                    .map(b => b.toString(16).padStart(2, '0'))
                    .join('');
                const fileName = `${Date.now()}_${randomString}_${file.name.replace(/\s+/g, '_')}`;
                const storageRef = ref(storage, `products/${user.uid}/${fileName}`);
                return uploadBytes(storageRef, file).then(snapshot => getDownloadURL(snapshot.ref));
            });
            const imageURLs = await Promise.all(imageUploadPromises);

            // Validate MOQ tiers before submission
            const normalizedMoqPrices = normalizeAndValidateTiers(productData.moqPrices);

            // Add product to Firestore
            await addDoc(collection(db, 'products'), {
                ...productData,
                images: imageURLs,
                moqPrices: normalizedMoqPrices,
                sellerId: user.uid,
                sellerName: `${user.firstName} ${user.lastName}`.trim() || user.email.split('@')[0],
                status: 'pending', // Requires admin approval
                createdAt: serverTimestamp(),
            });

            alert('Product submitted for approval.');
            setCurrentView('seller-dashboard');
        } catch (error) {
            console.error("Product Upload Failed:", error);
            alert(`Product Upload Failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    }, [user]);

    // Context Value
    const value = {
        user, 
        userId, 
        isSeller, 
        products, 
        cart, 
        loading, 
        currentView, 
        selectedProduct, 
        authModalOpen, 
        authMode, 
        authForm, 
        authLoading, 
        authStep,
        showPassword, // ✅ 추가
        setShowPassword, // ✅ 추가
        setCurrentView, 
        setSelectedProduct, 
        setAuthMode, 
        setAuthForm, 
        setAuthStep,
        handleViewDetail: (p) => { 
            setSelectedProduct(p); 
            setCurrentView('product-detail'); 
        },
        openAuthModal, 
        closeAuthModal,
        signInUser, 
        signUpUser, 
        signInWithGoogle,
        signOutUser,
        addToCart, 
        updateCartQuantity, 
        removeFromCart, 
        checkout,
        uploadProduct,
        isAuthReady,
        // ✅ Seller/Buyer 구분 헬퍼 함수
        isSellerUser: user?.userType === 'seller' && user?.status === 'active',
        isBuyerUser: user?.userType === 'buyer'
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};