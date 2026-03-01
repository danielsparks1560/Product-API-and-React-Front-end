package com.example.codingexercise.model;

import java.util.List;

public class ProductPackage {
    private String id;
    private String name;
    private String description;
    private List<String> productIds;
    private Double price;

    public ProductPackage(String id, String name, String description, List<String> productIds, Double price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.productIds = productIds;
        this.price = price;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<String> getProductIds() {
        return productIds;
    }

    public void setProductIds(List<String> productIds) {
        this.productIds = productIds;
    }

    public double getPrice(){
        return price;
    }
    
    public void setPrice(double price){
        this.price = price;
    }
}
