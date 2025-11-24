'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useSignerStatus } from '@account-kit/react';
import { useArena } from '@/hooks/useArena';
import { useWODToken } from '@/hooks/useWODToken';
import { Trophy, Clock, Users, Coins } from 'lucide-react';
import { Button } from '@/app/ui/Button';
import { Badge } from '@/app/ui/Badge';
import Link from 'next/link';

interface Challenge {
  id: number;
  name: string;
  description: string;
  entryFee: string;
  prizePool: string;
  startTime: bigint;
  endTime: bigint;
  isActive: boolean;
  participantCount: bigint;
}

export default function DesafiosPage() {
  const { address } = useAccount();
  const { isConnected } = useSignerStatus();
  const arena = useArena();
  const { formattedBalance, approveToken } = useWODToken();
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    // TODO: Buscar desafios ativos do contrato
    const mockChallenges: Challenge[] = [
      {
        id: 1,
        name: 'Desafio WOD #1',
        description: '100 burpees em 10 minutos',
        entryFee: '100',
        prizePool: '1500',
        startTime: BigInt(Math.floor(Date.now() / 1000)),
        endTime: BigInt(Math.floor(Date.now() / 1000) + 86400 * 7),
        isActive: true,
        participantCount: BigInt(12),
      },
      {
        id: 2,
        name: 'Desafio WOD #2',
        description: '50 pull-ups em 5 minutos',
        entryFee: '150',
        prizePool: '2000',
        startTime: BigInt(Math.floor(Date.now() / 1000)),
        endTime: BigInt(Math.floor(Date.now() / 1000) + 86400 * 5),
        isActive: true,
        participantCount: BigInt(8),
      },
    ];
    setChallenges(mockChallenges);
  }, []);

  const handleEnterChallenge = async (challengeId: number, entryFee: string) => {
    if (!address) {
      alert('Conecte sua wallet');
      return;
    }

    try {
      const arenaAddress = process.env.NEXT_PUBLIC_ARENA_ADDRESS || '';
      await approveToken.approve(arenaAddress, entryFee);
      const enterAction = arena.enterChallenge();
      enterAction.enterChallenge(challengeId);
    } catch (error) {
      console.error('Error entering challenge:', error);
      alert('Erro ao entrar no desafio');
    }
  };

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-arena p-8">
        <div className="max-w-7xl mx-auto text-center py-20">
          <h1 className="text-4xl font-bold mb-4 text-protocol">Desafios</h1>
          <p className="text-protocol/70 mb-8">
            Conecte sua wallet para ver e participar dos desafios
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
          <h1 className="text-4xl font-bold mb-2 text-protocol">🏟️ Desafios Ativos</h1>
          <p className="text-protocol/70">
            Participe, prove seu esforço e ganhe $WOD
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => {
            const isPast = Number(challenge.endTime) * 1000 < Date.now();
            const isActive = challenge.isActive && !isPast;
            const timeRemaining = Number(challenge.endTime) * 1000 - Date.now();
            const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));

            return (
              <div
                key={challenge.id}
                className="bg-gradient-to-br from-token/20 via-token/10 to-arena border border-token/30 rounded-xl p-6 shadow-lg hover:shadow-token transition-all"
              >
                {/* Header do Card */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1 text-protocol">{challenge.name}</h3>
                    <p className="text-sm text-protocol/70 mb-3">
                      {challenge.description}
                    </p>
                  </div>
                  {isActive ? (
                    <Badge variant="token">Ativo</Badge>
                  ) : (
                    <Badge variant="protocol">Encerrado</Badge>
                  )}
                </div>

                {/* Informações do Desafio */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Coins className="w-4 h-4 text-token" />
                    <span className="text-protocol/60">Taxa:</span>
                    <span className="font-semibold text-token font-mono">{challenge.entryFee} $WOD</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="w-4 h-4 text-token" />
                    <span className="text-protocol/60">Prize Pool:</span>
                    <span className="font-semibold text-token font-mono">{challenge.prizePool} $WOD</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-protocol/60" />
                    <span className="text-protocol/60">Participantes:</span>
                    <span className="font-semibold text-protocol">{challenge.participantCount.toString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-protocol/60" />
                    <span className="text-protocol/60">Encerra em:</span>
                    <span className="font-semibold text-protocol">{daysRemaining} dias</span>
                  </div>
                </div>

                {/* Ações */}
                {isActive && (
                  <div className="space-y-2">
                    <Link href={`/arena/${challenge.id}`}>
                      <Button variant="outline" className="w-full">
                        Ver Detalhes
                      </Button>
                    </Link>
                    <Button
                      variant="primary"
                      className="w-full"
                      onClick={() => handleEnterChallenge(challenge.id, challenge.entryFee)}
                      disabled={parseFloat(formattedBalance) < parseFloat(challenge.entryFee)}
                    >
                      {parseFloat(formattedBalance) < parseFloat(challenge.entryFee)
                        ? 'Saldo Insuficiente'
                        : 'Entrar no Desafio'}
                    </Button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {challenges.length === 0 && (
          <div className="text-center py-20 text-protocol/60">
            <p className="text-xl mb-2">Nenhum desafio ativo no momento</p>
            <p className="text-sm">Novos desafios aparecerão aqui</p>
          </div>
        )}
      </div>
    </main>
  );
}

