package com.example.codingexercise.repository;

import com.example.codingexercise.model.ProductPackage;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class PackageRepository {

    private final List<ProductPackage> productPackages = new ArrayList<>();

    public ProductPackage create(String name, String description, List<String> productIds, Double price) {
        ProductPackage newProductPackage = new ProductPackage(UUID.randomUUID().toString(), name, description, productIds, price);
        productPackages.add(newProductPackage);
        return newProductPackage;
    }

    public ProductPackage get(String id) {
        for (ProductPackage p : productPackages) {
            if (p.getId().equals(id)) {
                return p;
            }
        }
        return null;
    }

    public List<ProductPackage> getAll(){
        return productPackages;
    }

    public Boolean update(ProductPackage updatedProductPackage){
        for (int i = 0; i < productPackages.size(); i++) {
            if (productPackages.get(i).getId().equals(updatedProductPackage.getId())) {
                productPackages.set(i, updatedProductPackage);
                return true;
            }
        }
        
        return false;
    }

    public Boolean delete(String id){
        return productPackages.removeIf(x -> x.getId().equals(id));
    }
}
