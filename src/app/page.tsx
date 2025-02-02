"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./components/button";
import { Input } from "./components/input";
import { Card } from "./components/card";
import { CardProvider, useCard } from "./components/cardContext";

function GroceryList() {
  const { cardData, addCard, removeCard } = useCard();
  interface Item {
    id: number;
    store: string;
    customName: string;
    basePrice: string;
    URL: string;
  }

  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({
    store: "",
    customName: "",
    basePrice: "",
    URL: "",
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  const createItem = async () => {
    try {
      await axios.post("http://localhost:5000/api/items", newItem);
      fetchItems();
      setNewItem({ store: "", customName: "", basePrice: "", URL: "" });
    } catch (error) {
      console.error("Error creating item", error);
    }
  };

  const updateItem = async (id: number, updatedItem: Item) => {
    try {
      await axios.put(`http://localhost:5000/api/items/${id}`, updatedItem);
      fetchItems();
    } catch (error) {
      console.error("Error updating item", error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Grocery Price Fetcher</h1>
      <div className="flex gap-2 mb-4">
        <Input
          label="Store"
          placeholder="Store"
          value={newItem.store}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewItem({ ...newItem, store: e.target.value })
          }
        />
        <Input
          label="Custom Name"
          placeholder="Custom Name"
          value={newItem.customName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewItem({ ...newItem, customName: e.target.value })
          }
        />
        <Input
          label="Base Price"
          placeholder="Base Price"
          value={newItem.basePrice}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewItem({ ...newItem, basePrice: e.target.value })
          }
        />
        <Input
          label="URL"
          placeholder="URL"
          value={newItem.URL}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewItem({ ...newItem, URL: e.target.value })
          }
        />
        <Button onClick={createItem}>Create Grocery Item</Button>
      </div>
      <Button onClick={fetchItems}>List All Grocery Items</Button>
      <div className="grid gap-4">
        {items.map((item) => (
          <Card key={item.id} title={item.customName}>
            <p>
              <strong>Store:</strong> {item.store}
            </p>
            <p>
              <strong>Price:</strong> {item.basePrice}
            </p>
            <p>
              <a href={item.URL} target="_blank" rel="noopener noreferrer">
                View Item
              </a>
            </p>
            <div className="flex gap-2 mt-2">
              <Button onClick={() => updateItem(item.id, item)}>Edit</Button>
              <Button onClick={() => deleteItem(item.id)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <CardProvider>
      <GroceryList />
    </CardProvider>
  );
}
