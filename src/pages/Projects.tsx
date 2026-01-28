import { useState } from 'react';
import { useAppStore } from '@/store/appStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Plus, Edit2, Trash2, TrendingUp, Calendar, User } from 'lucide-react';
import { ProjectFormDialog } from '@/components/ProjectFormDialog';

export function Projects() {
    const { projects, deleteProject, getProjectProfitLoss } = useAppStore();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<typeof projects[0] | null>(null);

    const handleEdit = (project: typeof projects[0]) => {
        setEditingProject(project);
        setDialogOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            deleteProject(id);
        }
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setEditingProject(null);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'completed':
                return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'on-hold':
                return 'bg-orange-100 text-orange-700 border-orange-200';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Project Accounting</h2>
                    <p className="text-muted-foreground">Track profitability for every client project</p>
                </div>
                <Button onClick={() => setDialogOpen(true)} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                    <Plus className="w-4 h-4" />
                    New Project
                </Button>
            </div>

            {projects.length === 0 ? (
                <Card>
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <Briefcase className="w-16 h-16 text-slate-300 mb-4" />
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">No Projects Yet</h3>
                        <p className="text-slate-500 text-center mb-6 max-w-md">
                            Start tracking profitability by creating your first project. Assign orders and expenses to see real-time P&L.
                        </p>
                        <Button onClick={() => setDialogOpen(true)} className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                            <Plus className="w-4 h-4" />
                            Create Your First Project
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => {
                        const profitLoss = getProjectProfitLoss(project.id);
                        const profitMargin = profitLoss.income > 0
                            ? ((profitLoss.profit / profitLoss.income) * 100).toFixed(1)
                            : '0.0';

                        return (
                            <Card key={project.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-lg mb-2">{project.name}</CardTitle>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                                <User className="w-4 h-4" />
                                                {project.client_name}
                                            </div>
                                            <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status)}`}>
                                                {project.status === 'active' ? '🟢 Active' :
                                                    project.status === 'completed' ? '✅ Completed' :
                                                        '⏸️ On Hold'}
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {/* Dates */}
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {new Date(project.start_date).toLocaleDateString('en-GB')}
                                            {project.end_date && ` - ${new Date(project.end_date).toLocaleDateString('en-GB')}`}
                                        </span>
                                    </div>

                                    {/* Budget */}
                                    {project.budget && (
                                        <div className="text-sm">
                                            <span className="text-muted-foreground">Budget: </span>
                                            <span className="font-semibold">Rs. {project.budget.toLocaleString()}</span>
                                        </div>
                                    )}

                                    {/* P&L Summary */}
                                    <div className="border-t pt-3 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Income:</span>
                                            <span className="font-medium text-emerald-600">
                                                Rs. {profitLoss.income.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Expenses:</span>
                                            <span className="font-medium text-red-600">
                                                Rs. {profitLoss.expenses.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="flex justify-between border-t pt-2">
                                            <span className="font-semibold flex items-center gap-1">
                                                <TrendingUp className="w-4 h-4" />
                                                Net Profit:
                                            </span>
                                            <div className="text-right">
                                                <div className={`font-bold ${profitLoss.profit >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                                                    Rs. {profitLoss.profit.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-muted-foreground">
                                                    {profitMargin}% margin
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleEdit(project)}
                                            className="flex-1"
                                        >
                                            <Edit2 className="w-3 h-3 mr-1" />
                                            Edit
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDelete(project.id)}
                                            className="text-red-600 hover:bg-red-50 hover:border-red-300"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            <ProjectFormDialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                project={editingProject}
            />
        </div>
    );
}
