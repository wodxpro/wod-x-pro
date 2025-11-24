'use client';

import { ShieldCheck } from 'lucide-react';
import { LoginButton } from '@/components/LoginButton';
import { Badge } from '@/app/ui/Badge';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-arena flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo e Título */}
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-2 text-protocol">WOD[X] PRO</h1>
          <p className="text-protocol/70 mb-6">
            Transforme esforço físico em valor digital real
          </p>
          
          {/* Selo do Protocolo */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <ShieldCheck className="text-token w-6 h-6" />
            <Badge variant="protocol" className="text-sm">
              Protocolo Descentralizado
            </Badge>
          </div>
        </div>

        {/* Card de Login */}
        <div className="bg-arena border border-token/20 rounded-xl shadow-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-protocol mb-2">
              Conecte-se
            </h2>
            <p className="text-sm text-protocol/60">
              Use Alchemy Account Kit para login social sem fricção
            </p>
          </div>

          {/* Ícone de Login Social */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-token/10 border-2 border-token flex items-center justify-center">
              <ShieldCheck className="text-token w-8 h-8" />
            </div>
          </div>

          {/* Componente de Login */}
          <LoginButton />

          {/* Info adicional */}
          <div className="mt-6 text-center">
            <p className="text-xs text-protocol/50">
              Ao conectar, você recebe uma Smart Contract Wallet automaticamente
            </p>
            <p className="text-xs text-protocol/50 mt-1 font-mono">
              wod.eth • Token: $WOD
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

