'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { useSignerStatus } from '@account-kit/react';
import { useArena } from '@/hooks/useArena';
import { useWODToken } from '@/hooks/useWODToken';
import { Clock, Users, Trophy, Coins, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/app/ui/Card';
import { Button } from '@/app/ui/Button';
import { Badge, TokenBadge } from '@/app/ui/Badge';
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
  currentParticipants: bigint;
}

export default function ArenaPage() {
  const params = useParams();
  const router = useRouter();
  const challengeId = parseInt(params.id as string, 10);
  const { address } = useAccount();
  const { isConnected } = useSignerStatus();
  const arena = useArena();
  const { formattedBalance, approveToken } = useWODToken();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationStatus, setValidationStatus] = useState<'pending' | 'approved' | 'rejected' | null>(null);

  useEffect(() => {
    // TODO: Buscar desafio do contrato
    const mockChallenge: Challenge = {
      id: challengeId,
      name: 'Desafio WOD #1',
      description: '100 burpees em 10 minutos',
      entryFee: '100',
      prizePool: '1500',
      startTime: BigInt(Math.floor(Date.now() / 1000)),
      endTime: BigInt(Math.floor(Date.now() / 1000) + 86400 * 7),
      isActive: true,
      participantCount: BigInt(12),
      currentParticipants: BigInt(8),
    };
    setChallenge(mockChallenge);
  }, [challengeId]);

  useEffect(() => {
    if (!challenge) return;

    const updateTimer = () => {
      const remaining = Number(challenge.endTime) * 1000 - Date.now();
      setTimeRemaining(Math.max(0, remaining));
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [challenge]);

  const formatTime = (ms: number) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m ${seconds}s`;
  };

  const handleEnterChallenge = async () => {
    if (!address || !challenge) return;

    try {
      const arenaAddress = process.env.NEXT_PUBLIC_ARENA_ADDRESS || '';
      await approveToken.approve(arenaAddress, challenge.entryFee);
      const enterAction = arena.enterChallenge();
      enterAction.enterChallenge(challenge.id);
      setHasEntered(true);
    } catch (error) {
      console.error('Error entering challenge:', error);
      alert('Erro ao entrar no desafio');
    }
  };

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-arena p-8">
        <div className="max-w-7xl mx-auto text-center py-20">
          <h1 className="text-4xl font-bold mb-4 text-protocol">Arena</h1>
          <p className="text-protocol/70 mb-8">
            Conecte sua wallet para ver o desafio
          </p>
          <Link href="/login">
            <Button>Conectar Wallet</Button>
          </Link>
        </div>
      </main>
    );
  }

  if (!challenge) {
    return (
      <main className="min-h-screen bg-arena p-8">
        <div className="max-w-7xl mx-auto text-center py-20">
          <p className="text-protocol/60">Desafio não encontrado</p>
          <Link href="/desafios">
            <Button className="mt-4">Voltar para Desafios</Button>
          </Link>
        </div>
      </main>
    );
  }

  const isActive = challenge.isActive && timeRemaining > 0;

  return (
    <main className="min-h-screen bg-arena p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/desafios" className="text-sm text-token hover:underline mb-4 inline-block">
            ← Voltar para Desafios
          </Link>
          <h1 className="text-4xl font-bold mb-2 text-protocol">{challenge.name}</h1>
          <p className="text-protocol/70">{challenge.description}</p>
        </div>

        {/* HUD - Timer, Score, Validações */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {/* Timer */}
          <Card className="bg-gradient-to-br from-token/20 to-arena">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-token" />
                <span className="text-sm font-semibold text-protocol">Tempo Restante</span>
              </div>
              <div className="text-2xl font-bold text-token font-mono">
                {formatTime(timeRemaining)}
              </div>
            </CardContent>
          </Card>

          {/* Participantes */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-token" />
                <span className="text-sm font-semibold text-protocol">Participantes</span>
              </div>
              <div className="text-2xl font-bold text-protocol">
                {challenge.currentParticipants.toString()}
              </div>
              <p className="text-xs text-protocol/60 mt-1">
                de {challenge.participantCount.toString()} máx
              </p>
            </CardContent>
          </Card>

          {/* Prize Pool */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-token" />
                <span className="text-sm font-semibold text-protocol">Prize Pool</span>
              </div>
              <div className="text-2xl font-bold text-token font-mono">
                {challenge.prizePool}
              </div>
              <p className="text-xs text-protocol/60 mt-1">$WOD</p>
            </CardContent>
          </Card>

          {/* Status de Validação */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {validationStatus === 'approved' && <CheckCircle className="w-5 h-5 text-token" />}
                {validationStatus === 'rejected' && <XCircle className="w-5 h-5 text-protocol/60" />}
                <span className="text-sm font-semibold text-protocol">Status</span>
              </div>
              {validationStatus === 'approved' && (
                <Badge variant="success">Aprovado</Badge>
              )}
              {validationStatus === 'rejected' && (
                <Badge variant="protocol">Rejeitado</Badge>
              )}
              {validationStatus === 'pending' && (
                <Badge variant="info">Pendente</Badge>
              )}
              {!validationStatus && (
                <p className="text-sm text-protocol/60">Não submetido</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Conteúdo Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Informações do Desafio */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalhes do Desafio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-protocol/70">Taxa de Entrada</span>
                  <TokenBadge amount={challenge.entryFee} />
                </div>
                <div className="flex justify-between">
                  <span className="text-protocol/70">Prize Pool</span>
                  <TokenBadge amount={challenge.prizePool} />
                </div>
                <div className="flex justify-between">
                  <span className="text-protocol/70">Início</span>
                  <span className="text-protocol font-mono text-sm">
                    {new Date(Number(challenge.startTime) * 1000).toLocaleString('pt-BR')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-protocol/70">Término</span>
                  <span className="text-protocol font-mono text-sm">
                    {new Date(Number(challenge.endTime) * 1000).toLocaleString('pt-BR')}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Ações */}
            {isActive && (
              <Card>
                <CardHeader>
                  <CardTitle>Ações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!hasEntered ? (
                    <div>
                      <p className="text-sm text-protocol/70 mb-4">
                        Seu saldo: <TokenBadge amount={formattedBalance} />
                      </p>
                      <Button
                        variant="primary"
                        className="w-full"
                        onClick={handleEnterChallenge}
                        disabled={parseFloat(formattedBalance) < parseFloat(challenge.entryFee)}
                      >
                        {parseFloat(formattedBalance) < parseFloat(challenge.entryFee)
                          ? 'Saldo Insuficiente'
                          : 'Entrar no Desafio'}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Badge variant="success">Você está participando!</Badge>
                      {!hasSubmitted && (
                        <Link href="/">
                          <Button variant="primary" className="w-full">
                            Submeter Prova de Esforço
                          </Button>
                        </Link>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Regras</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-protocol/70">
                  <li>• Complete o desafio dentro do tempo</li>
                  <li>• Grave um vídeo como prova</li>
                  <li>• Submeta o vídeo para validação</li>
                  <li>• Aguarde aprovação dos validadores</li>
                  <li>• Receba sua parte do prize pool</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ranking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-protocol/60">
                  Ranking será atualizado após resolução do desafio
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

