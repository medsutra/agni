import { useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import { useReports, useSearchReports, useDeleteReport } from '@/hooks/useReports';
import { ReportCard } from './ReportCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface ReportsListProps {
  searchQuery?: string;
}

export function ReportsList({ searchQuery }: ReportsListProps) {
  const { toast } = useToast();
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const effectiveSearchQuery = searchQuery || localSearchQuery;

  const { data: reports, isLoading, error } = useReports();
  const { data: searchResults, isLoading: isSearching } = useSearchReports(effectiveSearchQuery);
  const deleteReport = useDeleteReport();

  const displayReports = effectiveSearchQuery ? searchResults : reports;
  const isLoadingData = isLoading || isSearching;

  const handleDelete = async (reportId: string) => {
    try {
      await deleteReport.mutateAsync(reportId);
      toast({
        title: 'Report deleted',
        description: 'The report has been successfully deleted.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete the report. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleView = (reportId: string) => {
    // Navigate to report detail view
    console.log('View report:', reportId);
  };

  const handleDownload = (reportId: string) => {
    // Download report
    console.log('Download report:', reportId);
  };

  if (error) {
    return (
      <Alert className="m-4">
        <AlertDescription>
          Failed to load reports. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6 pt-16 md:pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
        <div className="flex items-center space-x-4 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search reports..."
              value={localSearchQuery}
              onChange={(e) => setLocalSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
        </div>
      </div>

      {isLoadingData ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {displayReports?.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onDelete={handleDelete}
              onView={handleView}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}

      {!isLoadingData && displayReports?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {effectiveSearchQuery ? 'No reports found matching your search.' : 'No reports uploaded yet.'}
          </p>
        </div>
      )}
    </div>
  );
}