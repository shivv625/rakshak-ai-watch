import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommandButton } from "@/components/ui/command-button";
import { Play, Pause, Maximize2, Settings, AlertTriangle } from "lucide-react";

interface VideoFeedProps {
  feedId: string;
  title: string;
  location: string;
  status: "live" | "offline" | "recording";
  threatLevel: "low" | "medium" | "high" | "critical";
  detectedObjects?: string[];
}

export function VideoFeed({ 
  feedId, 
  title, 
  location, 
  status, 
  threatLevel, 
  detectedObjects = [] 
}: VideoFeedProps) {
  const [isPlaying, setIsPlaying] = useState(true);

  const getThreatBadgeVariant = (level: string) => {
    switch (level) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "secondary";
      default: return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "status-active";
      case "recording": return "status-standby";
      default: return "status-offline";
    }
  };

  return (
    <Card className="bg-card border-grid-primary">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-foreground">{title}</CardTitle>
            <p className="text-xs text-muted-foreground">{location}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant="outline" 
              className={`border-${getStatusColor(status)} text-${getStatusColor(status)}`}
            >
              {status.toUpperCase()}
            </Badge>
            {threatLevel !== "low" && (
              <Badge variant={getThreatBadgeVariant(threatLevel)}>
                <AlertTriangle className="w-3 h-3 mr-1" />
                {threatLevel.toUpperCase()}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="relative aspect-video bg-grid-secondary border border-grid-primary">
          {/* Video placeholder with tactical grid overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-background/20">
            <div className="w-full h-full bg-grid-pattern opacity-10"></div>
          </div>
          
          {/* Simulated video feed */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/20 flex items-center justify-center">
                📹
              </div>
              <p className="text-xs">Feed {feedId}</p>
            </div>
          </div>

          {/* Detection overlays */}
          {detectedObjects.length > 0 && (
            <div className="absolute top-2 left-2 flex flex-wrap gap-1">
              {detectedObjects.map((object, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {object}
                </Badge>
              ))}
            </div>
          )}

          {/* Threat level indicator */}
          {threatLevel !== "low" && (
            <div className="absolute top-2 right-2">
              <div className={`w-3 h-3 rounded-full bg-alert-${threatLevel === "critical" ? "critical" : threatLevel === "high" ? "warning" : "info"} animate-pulse`}></div>
            </div>
          )}

          {/* Control overlay */}
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
            <div className="flex gap-2">
              <CommandButton
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-black/50 hover:bg-black/70"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </CommandButton>
              
              <CommandButton
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-black/50 hover:bg-black/70"
              >
                <Maximize2 className="w-4 h-4" />
              </CommandButton>
              
              <CommandButton
                variant="ghost"
                size="icon"
                className="h-8 w-8 bg-black/50 hover:bg-black/70"
              >
                <Settings className="w-4 h-4" />
              </CommandButton>
            </div>
            
            <div className="text-xs text-white bg-black/50 px-2 py-1 rounded">
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}