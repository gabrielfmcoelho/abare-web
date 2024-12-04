'use client';

import { useState, FormEvent } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Edit, Trash, Lock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ListHeader } from './list-header';
import { DateRangeFilter } from './date-range-filter';
import { CategoryFilter } from './category-filter';

interface Note {
  id: number;
  title: string;
  content: string;
  categories: string[];
  date: string;
  author: string;
  isPrivate?: boolean;
}

interface NotesListProps {
  notes: Note[];
}

export function NotesList({ notes }: NotesListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    categories: [] as string[],
    isPrivate: false,
  });

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      categories: note.categories,
      isPrivate: note.isPrivate || false,
    });
    setIsOpen(true);
  };

  const handleDelete = (noteId: number) => {
    // In a real app, this would call an API
    console.log('Delete note:', noteId);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    console.log('Submit:', { ...formData, id: editingNote?.id });
    setIsOpen(false);
    setEditingNote(null);
    setFormData({
      title: '',
      content: '',
      categories: [],
      isPrivate: false,
    });
  };

  const handleDateRangeChange = (range: { from: Date | undefined; to: Date | undefined }) => {
    filterNotes(range, selectedCategories);
  };

  const handleCategoryChange = (categories: string[]) => {
    setSelectedCategories(categories);
    filterNotes(undefined, categories);
  };

  const filterNotes = (
    dateRange?: { from: Date | undefined; to: Date | undefined },
    categories: string[] = selectedCategories
  ) => {
    let filtered = [...notes];

    if (dateRange?.from) {
      filtered = filtered.filter((note) => {
        const noteDate = new Date(note.date);
        if (dateRange.to) {
          return noteDate >= dateRange.from! && noteDate <= dateRange.to;
        }
        return noteDate >= dateRange.from;
      });
    }

    if (categories.length > 0) {
      filtered = filtered.filter((note) =>
        note.categories.some((category) => categories.includes(category))
      );
    }

    setFilteredNotes(filtered);
  };

  const allCategories = Array.from(
    new Set(notes.flatMap((note) => note.categories))
  );

  return (
    <div className="space-y-4">
      <ListHeader
        title="Development Notes"
        description="Track observations and progress notes"
      />

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <DateRangeFilter onRangeChange={handleDateRangeChange} />
          <CategoryFilter
            categories={allCategories}
            selectedCategories={selectedCategories}
            onCategoryChange={handleCategoryChange}
          />
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingNote ? 'Edit Note' : 'Add New Note'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="categories">Categories</Label>
                <Select
                  value={formData.categories[0] || ''}
                  onValueChange={(value) => 
                    setFormData({ ...formData, categories: [...formData.categories, value] })
                  }
                  multiple
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Communication">Communication</SelectItem>
                    <SelectItem value="Social">Social</SelectItem>
                    <SelectItem value="Behavioral">Behavioral</SelectItem>
                    <SelectItem value="Educational">Educational</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="private"
                  checked={formData.isPrivate}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, isPrivate: checked })
                  }
                />
                <Label htmlFor="private">Private Note</Label>
              </div>
              <Button type="submit" className="w-full">
                {editingNote ? 'Save Changes' : 'Add Note'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="group">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  {note.title}
                  {note.isPrivate && (
                    <Lock className="h-3 w-3 text-muted-foreground" />
                  )}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {note.categories.map((category) => (
                    <Badge key={category} variant="outline">{category}</Badge>
                  ))}
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(note.date), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEdit(note)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Note
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDelete(note.id)}
                    className="text-destructive"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete Note
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{note.content}</p>
              <p className="text-sm text-muted-foreground mt-2">
                Added by {note.author}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}