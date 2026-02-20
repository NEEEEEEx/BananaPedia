import React from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';
import { ProductProvider } from './src/context/ProductContext';
import ProductScreen from './src/screens/ProductScreen';

const App = () => {
    return (
        <ProductProvider>
            <View style={styles.container}>
                <StatusBar barStyle="dark-content" backgroundColor="#f1c40f" />
                <View style={styles.header}>
                    <Text style={styles.headerText}>BananaPedia</Text>
                </View>
                <ProductScreen />
            </View>
        </ProductProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b2b2b',
    },
    header: {
        backgroundColor: '#f1c40f', // Banana yellow theme
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4, // Shadow for Android
        shadowColor: '#000', // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default App;