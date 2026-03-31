import React, { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { Loader2, AlertCircle, FileText } from "lucide-react";

// Configure worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

interface PdfPreviewProps {
  fileUrl?: string;
  fallbackImage?: string;
  className?: string;
  scale?: number;
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ fileUrl, fallbackImage, className, scale = 1.0 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    // Standardize worker before any calls
    if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (canvasRef.current) {
      observer.observe(canvasRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;
    
    // If not a PDF, stop loading immediately
    if (!fileUrl || !fileUrl.toLowerCase().endsWith(".pdf")) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    const renderPdf = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        
        const loadingTask = pdfjsLib.getDocument({
          url: fileUrl,
          disableRange: true,
          disableStream: true,
        });
        
        const pdf = await loadingTask.promise;
        
        if (!isMounted) return;

        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale });
        
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        // Dimension Guard: Prevent GL_INVALID_VALUE
        const outputWidth = Math.max(1, Math.floor(viewport.width));
        const outputHeight = Math.max(1, Math.floor(viewport.height));

        canvas.width = outputWidth;
        canvas.height = outputHeight;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
        if (isMounted) setIsLoading(false);
      } catch (error) {
        console.error("Error rendering PDF:", error, "URL:", fileUrl);
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
        }
      }
    };

    renderPdf();

    return () => {
      isMounted = false;
    };
  }, [fileUrl, isIntersecting, scale]);

  const isPdf = fileUrl?.toLowerCase().endsWith(".pdf");

  return (
    <div className={`relative w-full h-full overflow-hidden flex items-center justify-center bg-white/5 ${className}`}>
      {/* Loading state */}
      {isLoading && isPdf && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050505] z-10">
          <Loader2 className="w-8 h-8 text-primary animate-spin opacity-50" />
          <div className="absolute inset-0 shimmer opacity-10" />
        </div>
      )}

      {/* Fallback Image or Static Image (Udemy) */}
      {(!isPdf || hasError) ? (
        <img 
          src={fallbackImage || fileUrl} 
          alt="Preview" 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all group-hover:scale-105"
          onError={() => setHasError(true)}
        />
      ) : (
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-contain transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-80 group-hover:opacity-100 group-hover:scale-105'}`}
        />
      )}

      {/* Error state overlay */}
      {hasError && isPdf && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-20">
           <AlertCircle className="w-8 h-8 text-red-500/50 mb-2" />
           <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">Render_Failure</span>
        </div>
      )}

      {/* Type badge corner */}
      <div className="absolute top-2 left-2 p-1 px-2 rounded bg-black/60 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
         {isPdf ? <FileText className="w-3 h-3 text-primary/60" /> : <Loader2 className="w-3 h-3 text-secondary/60" />}
      </div>
    </div>
  );
};

export default PdfPreview;
