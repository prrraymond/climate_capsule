'use client';

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Leaf, Car, Home, ShoppingBag, Shirt, Plus, ChevronDown, ChevronUp } from 'lucide-react';


const ClimateDashboard = () => {
  const [lastUpdateTime] = useState(new Date().getTime());
  
  const categories = {
    food: {
      icon: Leaf,
      title: "Food and Diet",
      color: "text-green-600",
      actions: [
        "Eat a plant-based diet",
        "Choose organic and local foods",
        "Buy foodstuffs in bulk",
        "Reduce food waste",
        "Compost food waste",
        "Limit meat consumption",
        "Select sustainable fish"
      ]
    },
    transport: {
      icon: Car,
      title: "Transportation",
      color: "text-blue-600",
      actions: [
        "Drive less: walk, bike, use public transit",
        "Practice eco-driving habits",
        "Reduce air travel",
        "Switch to electric vehicle",
        "Regular car maintenance"
      ]
    },
    home: {
      icon: Home,
      title: "Home and Energy",
      color: "text-yellow-600",
      actions: [
        "Conduct energy audit",
        "Use LED bulbs",
        "Minimize standby power use",
        "Optimize water heater",
        "Install efficient fixtures",
        "Smart temperature control",
        "Switch to clean energy"
      ]
    },
    shopping: {
      icon: ShoppingBag,
      title: "Shopping and Consumption",
      color: "text-purple-600",
      actions: [
        "Buy less, choose used/recycled",
        "Use reusable bags",
        "Minimize packaging waste",
        "Choose efficient appliances",
        "Support eco-friendly companies"
      ]
    },
    clothing: {
      icon: Shirt,
      title: "Clothing",
      color: "text-pink-600",
      actions: [
        "Avoid fast fashion",
        "Buy vintage/recycled clothing",
        "Use cold water washing",
        "Practice clothing care"
      ]
    },
    other: {
      icon: Plus,
      title: "Additional Actions",
      color: "text-gray-600",
      actions: [
        "Go paperless",
        "Plant trees",
        "Recycle properly",
        "Create green spaces",
        "Track carbon footprint"
      ]
    }
  };

  type CategoryKey = keyof typeof categories;
  type Action = typeof categories[CategoryKey]['actions'][number];
  type ExpandedCategories = {
    [K in CategoryKey]?: boolean;
  };

  const [selectedPledges, setSelectedPledges] = useState<Set<Action>>(new Set());

  const [expandedCategories, setExpandedCategories] = useState<ExpandedCategories>({});

  const toggleCategory = (key: CategoryKey) => {
    setExpandedCategories(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const togglePledge = (action: Action) => {
    setSelectedPledges(prev => {
      const newSet = new Set(prev);
      if (newSet.has(action)) {
        newSet.delete(action);
      } else {
        newSet.add(action);
      }
      return newSet;
    });
  };

  // Calculate metrics
  const totalPledges = selectedPledges.size;
  const categoryPledgeCounts: Record<CategoryKey, number> = {
    food: 0,
    transport: 0,
    home: 0,
    shopping: 0,
    clothing: 0,
    other: 0

  };
  selectedPledges.forEach((pledge: Action) => {
    for (const [category, data] of Object.entries(categories)) {
      if (data.actions.includes(pledge)) {
        categoryPledgeCounts[category as CategoryKey] = (categoryPledgeCounts[category as CategoryKey] || 0) + 1;
      }
    }
  });
  
  const strongestCategory = Object.entries(categoryPledgeCounts)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'none';
    
  const opportunityCategory = Object.entries(categories)
    .sort(([,a], [,b]) => 
      (categoryPledgeCounts[b.title] || 0) / b.actions.length -
      (categoryPledgeCounts[a.title] || 0) / a.actions.length
    )[0]?.[0] || 'none';

// Track new initiatives since last update
  const newInitiatives = selectedPledges.size - 
    Array.from(selectedPledges).filter((pledge) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        // TODO: Will use pledge data for timestamp tracking
        return new Date().getTime() - lastUpdateTime < 24 * 60 * 60 * 1000
    }).length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Horizontal Metrics */}
      <Card className="w-full font-inter">
        <CardContent className="p-6">
          <div className="grid grid-cols-4 divide-x">
            <div className="px-4 first:pl-0">
              <div className="flex items-baseline gap-4">
                <div className="text-2xl font-bold">{totalPledges}</div>
                <div className={`text-sm ${totalPledges > 12 ? 'text-green-600' : 'text-orange-600'}`}>
                  {totalPledges > 12 ? '+' : ''}{((totalPledges / 12 - 1) * 100).toFixed(0)}%
                </div>
              </div>
              <div className="text-sm text-gray-600">Active Pledges</div>
            </div>
            
            <div className="px-4">
              <div className="flex items-baseline gap-4">
                <div className="text-2xl font-bold capitalize">{strongestCategory}</div>
                <div className="text-sm text-gray-600">
                  {Math.round((categoryPledgeCounts[strongestCategory] || 0) / 
                    (categories[strongestCategory]?.actions.length || 1) * 100)}%
                </div>
              </div>
              <div className="text-sm text-gray-600">Strongest Category</div>
            </div>

            <div className="px-4">
              <div className="flex items-baseline gap-4">
                <div className="text-2xl font-bold capitalize">{opportunityCategory}</div>
                <div className="text-sm text-orange-600">
                  {Math.round((1 - (categoryPledgeCounts[opportunityCategory] || 0) / 
                    (categories[opportunityCategory]?.actions.length || 1)) * 100)}%
                </div>
              </div>
              <div className="text-sm text-gray-600">Growth Opportunity</div>
            </div>

            <div className="px-4">
              <div className="flex items-baseline gap-4">
                <div className="text-2xl font-bold">+{newInitiatives}</div>
                <div className="text-sm text-green-600">new</div>
              </div>
              <div className="text-sm text-gray-600">Since Last Update</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Collapsible Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(categories).map(([key, category]) => (
          <Card key={key} className="overflow-hidden">
            <CardHeader 
              className="border-b bg-gray-50 cursor-pointer hover:bg-gray-100"
              onClick={() => toggleCategory(key)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 font-quicksand">
                  <category.icon className={`h-5 w-5 ${category.color}`} />
                  {category.title}
                </CardTitle>
                {expandedCategories[key] ? 
                  <ChevronUp className="h-5 w-5" /> : 
                  <ChevronDown className="h-5 w-5" />
                }
              </div>
            </CardHeader>
            {expandedCategories[key] && (
              <CardContent className="p-4">
                <ul className="space-y-2">
                  {category.actions.map((action) => (
                    <li 
                      key={action}
                      onClick={() => togglePledge(action)}
                      className={`
                        p-2 rounded cursor-pointer transition-colors
                        ${selectedPledges.has(action) 
                          ? 'bg-green-100 hover:bg-green-200' 
                          : 'hover:bg-gray-100'}
                      `}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`
                          w-4 h-4 rounded-full border-2
                          ${selectedPledges.has(action)
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-300'}
                        `}>
                          {selectedPledges.has(action) && (
                            <div className="w-full h-full text-white flex items-center justify-center">
                              ✓
                            </div>
                          )}
                        </div>
                        <span className="flex-1">{action}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClimateDashboard;