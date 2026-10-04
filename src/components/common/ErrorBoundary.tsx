import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CampusKart caught an error in ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('campuskart_state_v1');
    } catch (e) {
      console.error(e);
    }
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-pastel-warm flex items-center justify-center p-6 text-brand-dark">
          <div className="max-w-md w-full bg-white rounded-4xl p-8 border border-brand-border/80 shadow-soft-xl text-center space-y-5">
            <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-xs">
              <AlertTriangle size={32} />
            </div>

            <div className="space-y-1.5">
              <h2 className="text-xl font-black text-brand-dark">CampusKart Session Recovered</h2>
              <p className="text-xs text-brand-muted leading-relaxed">
                A temporary rendering issue occurred. Click below to reset to the clean demo state.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-left">
              <p className="text-[11px] font-mono text-slate-600 break-words line-clamp-3">
                {this.state.error?.message || 'Unknown render exception'}
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              icon={<RotateCcw size={16} />}
              onClick={this.handleReset}
              className="w-full font-bold justify-center shadow-soft"
            >
              Reset to Fresh Demo State
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
