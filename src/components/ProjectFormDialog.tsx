import { useState, useEffect } from 'react';
import { useAppStore, type Project } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

interface ProjectFormDialogProps {
    open: boolean;
    onClose: () => void;
    project?: Project | null;
}

export function ProjectFormDialog({ open, onClose, project }: ProjectFormDialogProps) {
    const { addProject, updateProject } = useAppStore();
    const [formData, setFormData] = useState({
        name: '',
        client_name: '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
        status: 'active' as 'active' | 'completed' | 'on-hold',
        budget: ''
    });

    useEffect(() => {
        if (project) {
            setFormData({
                name: project.name,
                client_name: project.client_name,
                start_date: project.start_date,
                end_date: project.end_date || '',
                status: project.status,
                budget: project.budget?.toString() || ''
            });
        } else {
            setFormData({
                name: '',
                client_name: '',
                start_date: new Date().toISOString().split('T')[0],
                end_date: '',
                status: 'active',
                budget: ''
            });
        }
    }, [project, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const projectData = {
            name: formData.name,
            client_name: formData.client_name,
            start_date: formData.start_date,
            end_date: formData.end_date || undefined,
            status: formData.status,
            budget: formData.budget ? parseFloat(formData.budget) : undefined
        };

        if (project) {
            updateProject(project.id, projectData);
        } else {
            addProject(projectData);
        }

        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{project ? 'Edit Project' : 'Create New Project'}</DialogTitle>
                    <DialogDescription>
                        {project
                            ? 'Update project details and track profitability'
                            : 'Add a new project to track income and expenses separately'}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <Label htmlFor="name">Project Name *</Label>
                            <Input
                                id="name"
                                placeholder="e.g., Gulberg Plaza Construction"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <Label htmlFor="client_name">Client Name *</Label>
                            <Input
                                id="client_name"
                                placeholder="e.g., ABC Developers Pvt Ltd"
                                value={formData.client_name}
                                onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="start_date">Start Date *</Label>
                            <Input
                                id="start_date"
                                type="date"
                                value={formData.start_date}
                                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="end_date">End Date (Optional)</Label>
                            <Input
                                id="end_date"
                                type="date"
                                value={formData.end_date}
                                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                                min={formData.start_date}
                            />
                        </div>

                        <div>
                            <Label htmlFor="status">Project Status *</Label>
                            <select
                                id="status"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                className="w-full px-3 py-2 border rounded-md bg-white"
                                required
                            >
                                <option value="active">🟢 Active</option>
                                <option value="on-hold">⏸️ On Hold</option>
                                <option value="completed">✅ Completed</option>
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="budget">Budget (Optional)</Label>
                            <Input
                                id="budget"
                                type="number"
                                placeholder="50000"
                                value={formData.budget}
                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                min="0"
                                step="0.01"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Estimated project budget in Rs.
                            </p>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>💡 Pro Tip:</strong> After creating this project, you can tag orders (income) and expenses to it when adding them. This will automatically calculate your project's profit/loss!
                        </p>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                            {project ? 'Update Project' : 'Create Project'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
