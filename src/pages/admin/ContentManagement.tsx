import React, { useState, useEffect } from 'react';
import { contentApi } from '../../api/content';
import type { SiteContent } from '../../types';
import { Button } from '../../components/Button';
import { Card, CardContent, CardHeader } from '../../components/Card';
import { Spinner } from '../../components/Spinner';
import { AlertCircle } from 'lucide-react';

export function ContentManagement() {
  const [content, setContent] = useState<SiteContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      const data = await contentApi.getAll();
      setContent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setContent(prev => {
      const existingIndex = prev.findIndex(item => item.key === key);
      if (existingIndex > -1) {
        const newState = [...prev];
        newState[existingIndex] = { ...newState[existingIndex], value };
        return newState;
      } else {
        return [...prev, { key, value }];
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await contentApi.update(content);
      alert('Content updated successfully!');
    } catch (err) {
      alert('Failed to update content: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setSaving(false);
    }
  };

  const renderField = (key: string, label: string, type: 'text' | 'textarea' = 'text') => {
    const item = content.find(c => c.key === key);
    const value = item ? item.value : '';

    return (
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={e => handleInputChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            rows={4}
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={e => handleInputChange(key, e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="flex justify-center py-8"><Spinner size="lg" /></div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Error</h3>
        <p className="text-slate-600 mb-4">{error}</p>
        <Button onClick={loadContent}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Content Management</h2>
      
      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('home')}
            className={`${activeTab === 'home' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Home Page
          </button>
          <button
            onClick={() => setActiveTab('about')}
            className={`${activeTab === 'about' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            About Page
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`${activeTab === 'contact' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Contact & Footer
          </button>
        </nav>
      </div>

      <form onSubmit={handleSubmit}>
        {activeTab === 'home' && (
          <Card>
            <CardHeader><h3 className="text-lg font-semibold">Home Page Content</h3></CardHeader>
            <CardContent className="space-y-4">
              <h4 className="text-md font-semibold">Hero Section</h4>
              {renderField('home_hero_title', 'Title')}
              {renderField('home_hero_subtitle', 'Subtitle', 'textarea')}
              <h4 className="text-md font-semibold pt-4 border-t">About Preview</h4>
              {renderField('home_about_title', 'Title')}
              {renderField('home_about_p1', 'Paragraph 1', 'textarea')}
              {renderField('home_about_p2', 'Paragraph 2', 'textarea')}
              <h4 className="text-md font-semibold pt-4 border-t">Why Choose Us</h4>
              {renderField('home_why_title', 'Title')}
              {renderField('home_why_subtitle', 'Subtitle', 'textarea')}
              {renderField('home_why_f1_title', 'Feature 1 Title')}
              {renderField('home_why_f1_text', 'Feature 1 Text', 'textarea')}
              {renderField('home_why_f2_title', 'Feature 2 Title')}
              {renderField('home_why_f2_text', 'Feature 2 Text', 'textarea')}
              {renderField('home_why_f3_title', 'Feature 3 Title')}
              {renderField('home_why_f3_text', 'Feature 3 Text', 'textarea')}
              <h4 className="text-md font-semibold pt-4 border-t">Services</h4>
              {renderField('home_services_title', 'Title')}
              {renderField('home_services_subtitle', 'Subtitle', 'textarea')}
              <h4 className="text-md font-semibold pt-4 border-t">Testimonials</h4>
              {renderField('home_testimonials_title', 'Title')}
              {renderField('home_testimonials_subtitle', 'Subtitle', 'textarea')}
              <h4 className="text-md font-semibold pt-4 border-t">Call to Action</h4>
              {renderField('home_cta_title', 'Title')}
              {renderField('home_cta_subtitle', 'Subtitle', 'textarea')}
            </CardContent>
          </Card>
        )}

        {activeTab === 'about' && (
          <Card>
            <CardHeader><h3 className="text-lg font-semibold">About Page Content</h3></CardHeader>
            <CardContent className="space-y-4">
              <h4 className="text-md font-semibold">Hero Section</h4>
              {renderField('about_hero_title', 'Title')}
              {renderField('about_hero_subtitle', 'Subtitle', 'textarea')}
              <h4 className="text-md font-semibold pt-4 border-t">Biography</h4>
              {renderField('about_bio_title', 'Title')}
              {renderField('about_bio_p1', 'Paragraph 1', 'textarea')}
              {renderField('about_bio_p2', 'Paragraph 2', 'textarea')}
              <h4 className="text-md font-semibold pt-4 border-t">Timeline</h4>
              {renderField('about_timeline_title', 'Title')}
              {renderField('about_timeline_subtitle', 'Subtitle', 'textarea')}
              {renderField('about_timeline_i1_title', 'Item 1 Title')}
              {renderField('about_timeline_i1_text', 'Item 1 Text', 'textarea')}
              {renderField('about_timeline_i2_title', 'Item 2 Title')}
              {renderField('about_timeline_i2_text', 'Item 2 Text', 'textarea')}
              {renderField('about_timeline_i3_title', 'Item 3 Title')}
              {renderField('about_timeline_i3_text', 'Item 3 Text', 'textarea')}
              {renderField('about_timeline_i4_title', 'Item 4 Title')}
              {renderField('about_timeline_i4_text', 'Item 4 Text', 'textarea')}
              {renderField('about_timeline_i5_title', 'Item 5 Title')}
              {renderField('about_timeline_i5_text', 'Item 5 Text', 'textarea')}
              {renderField('about_timeline_i6_title', 'Item 6 Title')}
              {renderField('about_timeline_i6_text', 'Item 6 Text', 'textarea')}
              <h4 className="text-md font-semibold pt-4 border-t">Call to Action</h4>
              {renderField('about_cta_title', 'Title')}
              {renderField('about_cta_subtitle', 'Subtitle', 'textarea')}
            </CardContent>
          </Card>
        )}

        {activeTab === 'contact' && (
          <Card>
            <CardHeader><h3 className="text-lg font-semibold">Contact & Footer Content</h3></CardHeader>
            <CardContent className="space-y-4">
              <h4 className="text-md font-semibold">Contact Page</h4>
              {renderField('contact_hero_title', 'Hero Title')}
              {renderField('contact_hero_subtitle', 'Hero Subtitle', 'textarea')}
              {renderField('contact_form_title', 'Form Title')}
              <h4 className="text-md font-semibold pt-4 border-t">Contact Info</h4>
              {renderField('contact_info_email', 'Email')}
              {renderField('contact_info_phone', 'Phone')}
              {renderField('contact_info_location', 'Location')}
              {renderField('contact_info_hours', 'Hours')}
              {renderField('contact_info_facebook_url', 'Facebook URL')}
              {renderField('contact_info_instagram_url', 'Instagram URL')}
              {renderField('contact_info_youtube_url', 'Youtube URL')}
              <h4 className="text-md font-semibold pt-4 border-t">Footer</h4>
              {renderField('footer_logo_text', 'Logo Text')}
              {renderField('footer_description', 'Description', 'textarea')}
              {renderField('footer_copyright', 'Copyright')}
            </CardContent>
          </Card>
        )}

        <div className="mt-6">
          <Button type="submit" disabled={saving}>
            {saving ? <><Spinner size="sm" className="mr-2" /> Saving...</> : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}