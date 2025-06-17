
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2, Check, X, BookOpen, FileText, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const KnowledgeBase = () => {
  const { toast } = useToast();
  const [documents, setDocuments] = useState([
    {
      id: '1',
      title: 'WhatsApp Business API Guidelines',
      content: 'WhatsApp Business API allows businesses to communicate with customers at scale...',
      file_type: 'text',
      is_active: true,
      created_at: '2024-01-15'
    },
    {
      id: '2',
      title: 'Pricing Information',
      content: 'Our platform offers flexible pricing plans starting from $29/month...',
      file_type: 'text',
      is_active: true,
      created_at: '2024-01-14'
    }
  ]);
  
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    file_type: 'text'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setDocuments(documents.map(doc => 
        doc.id === editingId 
          ? { ...doc, ...formData }
          : doc
      ));
      toast({ title: "Document updated successfully!" });
    } else {
      const newDocument = {
        id: Date.now().toString(),
        ...formData,
        is_active: true,
        created_at: new Date().toISOString().split('T')[0]
      };
      setDocuments([...documents, newDocument]);
      toast({ title: "Document added successfully!" });
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', file_type: 'text' });
    setIsCreating(false);
    setEditingId(null);
  };

  const handleEdit = (document: any) => {
    setFormData({
      title: document.title,
      content: document.content,
      file_type: document.file_type
    });
    setEditingId(document.id);
    setIsCreating(true);
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast({ title: "Document deleted successfully!" });
  };

  const toggleActive = (id: string) => {
    setDocuments(documents.map(doc => 
      doc.id === id 
        ? { ...doc, is_active: !doc.is_active }
        : doc
    ));
    toast({ title: "Document status updated!" });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Knowledge Base</h1>
        <p className="text-gray-600">Manage your AI knowledge base to improve conversation accuracy.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                {editingId ? 'Edit Document' : 'Add Document'}
              </CardTitle>
              <CardDescription>
                {editingId ? 'Update your knowledge base document' : 'Add new content to your knowledge base'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isCreating && !editingId ? (
                <div className="space-y-2">
                  <Button onClick={() => setIsCreating(true)} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Document
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload File
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Document Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Product Information"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      placeholder="Enter the document content..."
                      rows={8}
                      required
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button type="submit" className="flex-1">
                      <Check className="h-4 w-4 mr-2" />
                      {editingId ? 'Update' : 'Add'}
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
            {documents.map((document) => (
              <Card key={document.id} className={document.is_active ? '' : 'opacity-60'}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        {document.title}
                        {document.is_active && (
                          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Active
                          </span>
                        )}
                      </CardTitle>
                      <CardDescription>
                        Added on {document.created_at} • {document.file_type}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant={document.is_active ? "outline" : "default"}
                        onClick={() => toggleActive(document.id)}
                      >
                        {document.is_active ? 'Disable' : 'Enable'}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEdit(document)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDelete(document.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-3 rounded-md max-h-32 overflow-y-auto">
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {document.content.substring(0, 200)}
                      {document.content.length > 200 && '...'}
                    </p>
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

export default KnowledgeBase;
