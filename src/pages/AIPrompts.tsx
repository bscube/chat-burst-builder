
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Check, X, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AIPrompts = () => {
  const { toast } = useToast();
  const [prompts, setPrompts] = useState([
    {
      id: '1',
      name: 'Customer Support',
      system_prompt: 'You are a helpful customer support agent for a WhatsApp marketing platform. Be friendly, professional, and provide clear solutions.',
      description: 'Default prompt for customer support conversations',
      is_active: true
    },
    {
      id: '2',
      name: 'Sales Assistant',
      system_prompt: 'You are a sales assistant helping customers understand our WhatsApp marketing solutions. Focus on benefits and ROI.',
      description: 'Prompt optimized for sales conversations',
      is_active: false
    }
  ]);
  
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    system_prompt: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setPrompts(prompts.map(prompt => 
        prompt.id === editingId 
          ? { ...prompt, ...formData }
          : prompt
      ));
      toast({ title: "Prompt updated successfully!" });
    } else {
      const newPrompt = {
        id: Date.now().toString(),
        ...formData,
        is_active: false
      };
      setPrompts([...prompts, newPrompt]);
      toast({ title: "Prompt created successfully!" });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: '', system_prompt: '', description: '' });
    setIsCreating(false);
    setEditingId(null);
  };

  const handleEdit = (prompt: any) => {
    setFormData({
      name: prompt.name,
      system_prompt: prompt.system_prompt,
      description: prompt.description
    });
    setEditingId(prompt.id);
    setIsCreating(true);
  };

  const handleDelete = (id: string) => {
    setPrompts(prompts.filter(prompt => prompt.id !== id));
    toast({ title: "Prompt deleted successfully!" });
  };

  const toggleActive = (id: string) => {
    setPrompts(prompts.map(prompt => 
      prompt.id === id 
        ? { ...prompt, is_active: !prompt.is_active }
        : { ...prompt, is_active: false }
    ));
    toast({ title: "Active prompt updated!" });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Prompts</h1>
        <p className="text-gray-600">Manage your AI conversation prompts to customize chatbot behavior.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2" />
                {editingId ? 'Edit Prompt' : 'Create New Prompt'}
              </CardTitle>
              <CardDescription>
                {editingId ? 'Update your AI prompt settings' : 'Add a new AI conversation prompt'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isCreating && !editingId ? (
                <Button onClick={() => setIsCreating(true)} className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Prompt
                </Button>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Prompt Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Customer Support"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description of this prompt"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="system_prompt">System Prompt</Label>
                    <Textarea
                      id="system_prompt"
                      value={formData.system_prompt}
                      onChange={(e) => setFormData({ ...formData, system_prompt: e.target.value })}
                      placeholder="You are a helpful assistant..."
                      rows={6}
                      required
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button type="submit" className="flex-1">
                      <Check className="h-4 w-4 mr-2" />
                      {editingId ? 'Update' : 'Create'}
                    </Button>
                    <Button type="button" variant="outline" onClick={resetForm}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {prompts.map((prompt) => (
              <Card key={prompt.id} className={prompt.is_active ? 'ring-2 ring-purple-500' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        {prompt.name}
                        {prompt.is_active && (
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Active
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription>{prompt.description}</CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={prompt.is_active ? "outline" : "default"}
                        onClick={() => toggleActive(prompt.id)}
                      >
                        {prompt.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(prompt)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(prompt.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{prompt.system_prompt}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPrompts;
