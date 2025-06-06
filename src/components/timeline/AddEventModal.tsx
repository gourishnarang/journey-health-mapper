import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Event } from './TimelineCanvas';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: Omit<Event, 'id' | 'side'>) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [age, setAge] = useState('');
  const [type, setType] = useState<'income' | 'expense' | 'goal' | 'milestone'>('milestone');
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState<'monthly' | 'yearly'>('monthly');
  const [endAge, setEndAge] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!title) {
      toast.error("Please enter a title for your event");
      return;
    }
    
    if (!age || isNaN(Number(age)) || Number(age) < 0 || Number(age) > 90) {
      toast.error("Please enter a valid age between 0 and 90");
      return;
    }

    if (isRecurring) {
      if (!endAge || isNaN(Number(endAge)) || Number(endAge) <= Number(age) || Number(endAge) > 90) {
        toast.error("Please enter a valid end age between the start age and 90");
        return;
      }
    }
    
    const newEvent = {
      type,
      title,
      description,
      amount: amount ? Number(amount) : 0,
      age: Number(age),
      isRecurring,
      ...(isRecurring && {
        frequency,
        endAge: Number(endAge)
      })
    };
    
    onAdd(newEvent);
    
    // Reset form
    setTitle('');
    setDescription('');
    setAmount('');
    setAge('');
    setType('milestone');
    setIsRecurring(false);
    setFrequency('monthly');
    setEndAge('');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Financial Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="0"
                  max="90"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select 
                  value={type} 
                  onValueChange={(value) => setType(value as any)}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="goal">Goal</SelectItem>
                    <SelectItem value="milestone">Milestone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Add some details about this event"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                min="0"
                placeholder="Dollar Amount (optional)"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="recurring"
                checked={isRecurring}
                onCheckedChange={setIsRecurring}
              />
              <Label htmlFor="recurring">Recurring Event</Label>
            </div>

            {isRecurring && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select 
                      value={frequency} 
                      onValueChange={(value) => setFrequency(value as 'monthly' | 'yearly')}
                    >
                      <SelectTrigger id="frequency">
                        <SelectValue placeholder="Select Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endAge">End Age</Label>
                    <Input
                      id="endAge"
                      type="number"
                      min={age || "0"}
                      max="90"
                      placeholder="End Age"
                      value={endAge}
                      onChange={(e) => setEndAge(e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-fin-purple hover:bg-fin-purple-dark">
              Add to Timeline
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventModal;
