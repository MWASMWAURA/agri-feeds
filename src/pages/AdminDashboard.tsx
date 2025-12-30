import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAdmin, AdminProduct } from '@/context/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Star, TrendingUp, Package, X } from 'lucide-react';

const AdminDashboard = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleManualPopular, getSalesAnalytics } = useAdmin();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    emoji: '',
    price: '',
    description: '',
    longDescription: '',
    weight: '',
    ingredients: '',
    color: '',
    category: '',
    stock: '',
    image: '',
  });

  const analytics = getSalesAnalytics();
  const categories = ['Feed', 'Supplements', 'Equipment', 'Treats'];
  const colors = [
    { name: 'Farm Gold', value: 'bg-farm-gold/40' },
    { name: 'Farm Green', value: 'bg-farm-green/30' },
    { name: 'Accent', value: 'bg-accent/30' },
    { name: 'Secondary', value: 'bg-secondary/40' },
    { name: 'Farm Sky', value: 'bg-farm-sky/30' },
    { name: 'Farm Brown', value: 'bg-farm-brown/20' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    // Reset the file input
    const fileInput = document.getElementById('image-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      emoji: formData.emoji,
      price: parseFloat(formData.price),
      description: formData.description,
      longDescription: formData.longDescription,
      weight: formData.weight,
      ingredients: formData.ingredients.split(',').map(i => i.trim()).filter(i => i),
      color: formData.color,
      category: formData.category,
      stock: parseInt(formData.stock),
      image: formData.image || undefined,
      isManuallyPopular: false,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      setEditingProduct(null);
    } else {
      addProduct(productData);
    }

    resetForm();
    setIsAddDialogOpen(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      emoji: '',
      price: '',
      description: '',
      longDescription: '',
      weight: '',
      ingredients: '',
      color: '',
      category: '',
      stock: '',
      image: '',
    });
  };

  const handleEdit = (product: AdminProduct) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      emoji: product.emoji,
      price: product.price.toString(),
      description: product.description,
      longDescription: product.longDescription || '',
      weight: product.weight || '',
      ingredients: product.ingredients.join(', '),
      color: product.color,
      category: product.category,
      stock: product.stock.toString(),
      image: product.image || '',
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-display text-5xl md:text-8xl uppercase mb-4">
              Admin <span className="text-stroke">Dashboard</span>
            </h1>
            <p className="font-mono text-muted-foreground max-w-lg mx-auto">
              Manage your products, track sales, and analyze performance 📊
            </p>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:scale-105 transition-transform duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-mono">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.length}</div>
                <p className="text-xs text-muted-foreground">
                  {products.filter(p => p.stock < 10).length} low stock
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:scale-105 transition-transform duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-mono">Total Sales</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analytics.totalSales}</div>
                <p className="text-xs text-muted-foreground">
                  ${analytics.totalRevenue.toFixed(2)} revenue
                </p>
              </CardContent>
            </Card>
            
            <Card className="hover:scale-105 transition-transform duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-mono">Popular Items</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {products.filter(p => p.isManuallyPopular || p.salesCount >= 10).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Auto & manual badges
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              {/* Add Product Button */}
              <div className="flex justify-between items-center">
                <h2 className="font-display text-2xl uppercase">Product Management</h2>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={() => { resetForm(); setEditingProduct(null); }}
                      className="hover:scale-105 transition-transform duration-200"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Product
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="space-y-3">
                      <DialogTitle className="text-2xl font-display">
                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                      </DialogTitle>
                      <DialogDescription className="text-base">
                        Fill in the product details below. All fields marked with * are required.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Basic Info Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-mono uppercase tracking-wider border-b pb-2">Basic Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-mono">Product Name *</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => handleInputChange('name', e.target.value)}
                              required
                              className="transition-all duration-200 focus:scale-105"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="emoji" className="text-sm font-mono">Emoji *</Label>
                            <Input
                              id="emoji"
                              value={formData.emoji}
                              onChange={(e) => handleInputChange('emoji', e.target.value)}
                              required
                              placeholder="🐓"
                              className="transition-all duration-200 focus:scale-105"
                            />
                            <div className="flex flex-wrap gap-1 mt-2">
                              {['🐓', '🐄', '🐷', '🐴', '🐑', '🐐', '🌾', '🌽', '🥕', '🥬', '🥔', '🍎'].map(emoji => (
                                <button
                                  key={emoji}
                                  type="button"
                                  onClick={() => handleInputChange('emoji', emoji)}
                                  className="text-lg hover:bg-accent/20 rounded p-1 transition-colors"
                                >
                                  {emoji}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-sm font-mono">Short Description *</Label>
                          <Input
                            id="description"
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            required
                            className="transition-all duration-200 focus:scale-105"
                          />
                        </div>
                      </div>

                      {/* Image Upload Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-mono uppercase tracking-wider border-b pb-2">Product Image</h3>
                        
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="image-upload" className="text-sm font-mono">Upload Image (optional)</Label>
                            <Input
                              id="image-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="transition-all duration-200 focus:scale-105"
                            />
                            <p className="text-xs text-muted-foreground">
                              Supported formats: JPG, PNG, GIF. Max size: 5MB
                            </p>
                          </div>
                          
                          {formData.image && (
                            <div className="space-y-2">
                              <Label className="text-sm font-mono">Image Preview</Label>
                              <div className="relative inline-block">
                                <img
                                  src={formData.image}
                                  alt="Product preview"
                                  className="w-32 h-32 object-cover rounded-lg border"
                                />
                                <Button
                                  type="button"
                                  variant="destructive"
                                  size="sm"
                                  onClick={removeImage}
                                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Pricing & Inventory Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-mono uppercase tracking-wider border-b pb-2">Pricing & Inventory</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="price" className="text-sm font-mono">Price ($) *</Label>
                            <Input
                              id="price"
                              type="number"
                              step="0.01"
                              value={formData.price}
                              onChange={(e) => handleInputChange('price', e.target.value)}
                              required
                              className="transition-all duration-200 focus:scale-105"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="stock" className="text-sm font-mono">Stock *</Label>
                            <Input
                              id="stock"
                              type="number"
                              value={formData.stock}
                              onChange={(e) => handleInputChange('stock', e.target.value)}
                              required
                              className="transition-all duration-200 focus:scale-105"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="weight" className="text-sm font-mono">Weight</Label>
                            <Input
                              id="weight"
                              value={formData.weight}
                              onChange={(e) => handleInputChange('weight', e.target.value)}
                              placeholder="25 kg"
                              className="transition-all duration-200 focus:scale-105"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Categorization Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-mono uppercase tracking-wider border-b pb-2">Categorization</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm font-mono">Category *</Label>
                            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                              <SelectTrigger className="transition-all duration-200 focus:scale-105">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map(category => (
                                  <SelectItem key={category} value={category}>{category}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="color" className="text-sm font-mono">Color Theme *</Label>
                            <Select value={formData.color} onValueChange={(value) => handleInputChange('color', value)}>
                              <SelectTrigger className="transition-all duration-200 focus:scale-105">
                                <SelectValue placeholder="Select color" />
                              </SelectTrigger>
                              <SelectContent>
                                {colors.map(color => (
                                  <SelectItem key={color.value} value={color.value}>
                                    <div className="flex items-center gap-2">
                                      <div className={`w-4 h-4 rounded ${color.value}`}></div>
                                      {color.name}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>

                      {/* Details Section */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-mono uppercase tracking-wider border-b pb-2">Additional Details</h3>
                        
                        <div className="space-y-2">
                          <Label htmlFor="longDescription" className="text-sm font-mono">Long Description</Label>
                          <Textarea
                            id="longDescription"
                            value={formData.longDescription}
                            onChange={(e) => handleInputChange('longDescription', e.target.value)}
                            rows={3}
                            className="transition-all duration-200 focus:scale-105 resize-none"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="ingredients" className="text-sm font-mono">Ingredients (comma-separated)</Label>
                          <Textarea
                            id="ingredients"
                            value={formData.ingredients}
                            onChange={(e) => handleInputChange('ingredients', e.target.value)}
                            placeholder="Corn, Soybean Meal, Wheat, Calcium Carbonate"
                            rows={2}
                            className="transition-all duration-200 focus:scale-105 resize-none"
                          />
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsAddDialogOpen(false)}
                          className="hover:scale-105 transition-transform duration-200"
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          className="hover:scale-105 transition-transform duration-200"
                        >
                          {editingProduct ? 'Update' : 'Add'} Product
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Products Table */}
              <div className="space-y-4">
                {products.map((product) => (
                  <Card key={product.id} className="hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">{product.emoji}</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-display text-xl uppercase">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.description}</p>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                              <Badge variant="outline">{product.category}</Badge>
                              <Badge variant="outline">${product.price}</Badge>
                              <Badge variant="outline">Stock: {product.stock}</Badge>
                              <Badge variant="outline">Sales: {product.salesCount}</Badge>
                              {product.isManuallyPopular && (
                                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500">
                                  🔥 Popular
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleManualPopular(product.id)}
                            className="hover:scale-110 transition-transform duration-200"
                          >
                            <Star className={`h-4 w-4 ${product.isManuallyPopular ? 'fill-current text-yellow-500' : ''}`} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(product)}
                            className="hover:scale-110 transition-transform duration-200"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                            className="hover:scale-110 transition-transform duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="space-y-6">
                <h2 className="font-display text-2xl uppercase">Sales Analytics</h2>
                
                {/* Top Selling Products */}
                <Card className="hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <CardTitle>Top Selling Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.topSellingProducts.map(({ product, salesCount }, index) => (
                        <div key={product.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/20 transition-colors duration-200">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl font-bold text-primary">#{index + 1}</div>
                            <div className="text-2xl">{product.emoji}</div>
                            <div>
                              <div className="font-mono">{product.name}</div>
                              <div className="text-sm text-muted-foreground">{product.category}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{salesCount} sales</div>
                            <div className="text-sm text-muted-foreground">${(product.price * salesCount).toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Category Statistics */}
                <Card className="hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <CardTitle>Category Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analytics.categoryStats.map(({ category, count, revenue }) => (
                        <div key={category} className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/20 transition-colors duration-200">
                          <div>
                            <div className="font-mono">{category}</div>
                            <div className="text-sm text-muted-foreground">{count} products</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">${revenue.toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;