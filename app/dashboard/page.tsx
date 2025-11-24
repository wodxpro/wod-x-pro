'use client';

import { useAccount } from 'wagmi';
import { useSignerStatus } from '@account-kit/react';
import { useWODToken } from '@/hooks/useWODToken';
import { ReputationScore } from '@/app/ui/Score';
import { Card, CardHeader, CardTitle, CardContent } from '@/app/ui/Card';
import { Badge, TokenBadge } from '@/app/ui/Badge';
import { Trophy, TrendingUp, Award, Target } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/app/ui/Button';

export default function DashboardPage() {
  const { address } = useAccount();
  const { isConnected } = useSignerStatus();
  const { formattedBalance } = useWODToken();

  // Mock data - em produção, buscar do contrato
  const reputationScore = 750;
  const challengesWon = 3;
  const challengesParticipated = 8;
  const totalEarned = 450;
  const rank = 'Top 15%';

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-arena p-8">
        <div className="max-w-7xl mx-auto text-center py-20">
          <h1 className="text-4xl font-bold mb-4 text-protocol">Dashboard</h1>
          <p className="text-protocol/70 mb-8">
            Conecte sua wallet para ver seu dashboard
          </p>
          <Link href="/login">
            <Button>Conectar Wallet</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-arena p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-protocol">Dashboard</h1>
              <p className="text-protocol/70">
                Seu desempenho e estatísticas no protocolo
              </p>
            </div>
            {address && (
              <div className="text-right">
                <p className="text-sm text-protocol/60">Wallet</p>
                <p className="text-sm font-mono text-protocol">{address.slice(0, 6)}...{address.slice(-4)}</p>
              </div>
            )}
          </div>
        </header>

        {/* Reputation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Reputation Score */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-token" />
                Reputation Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ReputationScore score={reputationScore} max={1000} />
              <div className="mt-4">
                <Badge variant="token">{rank}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Saldo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-token" />
                Saldo $WOD
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-token font-mono mb-2">
                {formattedBalance}
              </div>
              <TokenBadge amount={formattedBalance} />
            </CardContent>
          </Card>

          {/* Desafios Vencidos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-token" />
                Desafios Vencidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-protocol mb-2">
                {challengesWon}
              </div>
              <p className="text-sm text-protocol/60">
                de {challengesParticipated} participados
              </p>
            </CardContent>
          </Card>

          {/* Total Ganho */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-token" />
                Total Ganho
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-token font-mono mb-2">
                {totalEarned}
              </div>
              <p className="text-sm text-protocol/60">$WOD acumulados</p>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/desafios">
            <Card className="hover:shadow-token transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Trophy className="w-12 h-12 text-token mx-auto mb-4" />
                <h3 className="text-xl font-bold text-protocol mb-2">Ver Desafios</h3>
                <p className="text-sm text-protocol/60">
                  Participe de novos desafios
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/validar">
            <Card className="hover:shadow-token transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-token mx-auto mb-4" />
                <h3 className="text-xl font-bold text-protocol mb-2">Validar</h3>
                <p className="text-sm text-protocol/60">
                  Avaliar submissões pendentes
                </p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-token transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 text-token mx-auto mb-4" />
              <h3 className="text-xl font-bold text-protocol mb-2">Meus Treinos</h3>
              <p className="text-sm text-protocol/60">
                Ver histórico de treinos
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

