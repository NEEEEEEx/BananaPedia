import React, { useContext, useState } from 'react';
import { 
    View, 
    Text, 
    FlatList, 
    ActivityIndicator, 
    StyleSheet, 
    Image,
    RefreshControl 
} from 'react-native';
import { ProductContext } from '../context/ProductContext';

const ProductScreen = () => {
    const { products, isLoading, error, fetchProductsData } = useContext(ProductContext);
    
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        if (fetchProductsData) {
            await fetchProductsData(); 
        }
        setRefreshing(false);
    };

    if (isLoading && !refreshing) { 
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#f1c40f" />
                <Text style={styles.stateText}>Loading BananaPedia...</Text>
            </View>
        );
    }

    if (error && !refreshing) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Oops! {error}</Text>
            </View>
        );
    }

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.stateText}>No products available.</Text>
            </View>
        );
    }

    const renderProduct = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
            <View style={styles.details}>
                <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderProduct}
                contentContainerStyle={styles.listContainer}
                refreshControl={
                    <RefreshControl 
                        refreshing={refreshing} 
                        onRefresh={onRefresh} 
                        colors={['#f1c40f']} 
                        progressBackgroundColor="#2b2b2b"
                    />
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2b2b2b',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    stateText: {
        marginTop: 10,
        fontSize: 16,
        color: '#c7c7c7',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
    },
    listContainer: {
        padding: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#4d4d4d',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        shadowColor: '#ffffff',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 12,
    },
    details: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#d4d8da',
    },
    price: {
        fontSize: 16,
        color: '#11793c',
        fontWeight: '600',
    },
});

export default ProductScreen;