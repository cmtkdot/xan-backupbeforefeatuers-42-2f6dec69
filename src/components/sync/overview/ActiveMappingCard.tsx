
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { formatTimestamp } from '@/utils/date-utils';
import { getStatusBadge, getStatusIcon } from '../ui/StatusBadgeUtils';
import { GlSyncStatus } from '@/types/glsync';
import { ProgressIndicator } from '../ui/ProgressIndicator';

interface ActiveMappingCardProps {
  status: GlSyncStatus;
  onSync: (connectionId: string, mappingId: string) => Promise<void>;
  isSyncing: boolean;
}

export function ActiveMappingCard({ status, onSync, isSyncing }: ActiveMappingCardProps) {
  // Use optional chaining and nullish coalescing to safely access properties
  const displayName = status.glide_table_display_name || status.glide_table || 'Unknown Table';
  const appName = status.app_name || 'Unknown App';
  const supababeTable = status.supabase_table || 'Unknown Table';
  const currentStatus = status.current_status || 'not_synced';
  
  const handleSync = async () => {
    if (status.connection_id && status.mapping_id) {
      await onSync(status.connection_id, status.mapping_id);
    }
  };
  
  const isDisabled = isSyncing || currentStatus === 'processing' || !status.connection_id || !status.mapping_id;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base font-medium">
              {displayName}
            </CardTitle>
            <div className="text-sm text-muted-foreground">
              {appName} → {supababeTable}
            </div>
          </div>
          <div className="flex items-center">
            {getStatusBadge(currentStatus)}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="text-sm mt-2 space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">Status:</span>
            <div className="flex items-center gap-1">
              {getStatusIcon(currentStatus)}
              <span>
                {currentStatus
                  ? currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)
                  : 'Not synced'}
              </span>
            </div>
          </div>
          
          <ProgressIndicator 
            current={status.records_processed} 
            total={status.total_records} 
          />
          
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Last sync: {formatTimestamp(status.last_sync_completed_at)}
            </div>
            <div className="flex space-x-2">
              <Link to={`/sync/mappings?id=${status.mapping_id}`}>
                <Button 
                  size="sm"
                  variant="outline"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Details
                </Button>
              </Link>
              <Button 
                size="sm"
                onClick={handleSync}
                disabled={isDisabled}
              >
                {isSyncing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync Now
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
