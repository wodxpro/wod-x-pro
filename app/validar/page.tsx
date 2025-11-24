'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useSignerStatus } from '@account-kit/react';
import { useArena } from '@/hooks/useArena';
import { CheckCircle, XCircle, Play, ExternalLink } from 'lucide-react';
import { Button } from '@/app/ui/Button';
import { Card } from '@/app/ui/Card';
import Link from 'next/link';

interface Submission {
  challengeId: number;
  athlete: string;
  proofCID: string;
  timestamp: number;
}

export default function ValidarPage() {
  const { address } = useAccount();
  const { isConnected } = useSignerStatus();
  const arena = useArena();
  const [pendingSubmissions, setPendingSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // TODO: Buscar submissões pendentes do contrato
    setPendingSubmissions([
      {
        challengeId: 1,
        athlete: '0x1234...5678',
        proofCID: 'QmABC123...',
        timestamp: Date.now() - 86400000,
      },
      {
        challengeId: 2,
        athlete: '0x9876...5432',
        proofCID: 'QmXYZ789...',
        timestamp: Date.now() - 3600000,
      },
    ]);
  }, []);

  const handleVote = async (challengeId: number, athlete: string, approved: boolean) => {
    try {
      const voteAction = arena.vote();
      voteAction.vote(challengeId, athlete, approved);
      // Remover da lista após votar
      setPendingSubmissions(prev => prev.filter(s => s.athlete !== athlete));
      setSelectedSubmission(null);
    } catch (error) {
      console.error('Error voting:', error);
      alert('Erro ao votar');
    }
  };

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-arena p-8">
        <div className="max-w-7xl mx-auto text-center py-20">
          <h1 className="text-4xl font-bold mb-4 text-protocol">Validar</h1>
          <p className="text-protocol/70 mb-8">
            Conecte sua wallet para validar submissões
          </p>
          <Link href="/login">
            <Button>Conectar Wallet</Button>
          </Link>
        </div>
      </main>
    );
  }

  const videoUrl = selectedSubmission 
    ? `https://ipfs.io/ipfs/${selectedSubmission.proofCID}`
    : null;

  return (
    <main className="min-h-screen bg-arena p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2 text-protocol">⚖️ Validar Submissões</h1>
          <p className="text-protocol/70">
            Avalie provas de esforço e vote para aprovar ou rejeitar
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Submissões */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-protocol mb-4">
              Pendentes ({pendingSubmissions.length})
            </h2>
            {pendingSubmissions.length === 0 ? (
              <Card>
                <div className="text-center py-12 text-protocol/60">
                  <p>Nenhuma submissão pendente</p>
                </div>
              </Card>
            ) : (
              pendingSubmissions.map((submission, index) => (
                <Card
                  key={index}
                  onClick={() => setSelectedSubmission(submission)}
                  className={`transition-all ${
                    selectedSubmission?.athlete === submission.athlete
                      ? 'border-token shadow-token'
                      : 'hover:border-token/50'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-protocol">
                        Desafio #{submission.challengeId}
                      </h3>
                      <span className="text-xs text-protocol/50 font-mono">
                        {new Date(submission.timestamp).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    <p className="text-sm text-protocol/70 font-mono mb-2">
                      {submission.athlete}
                    </p>
                    <p className="text-xs text-protocol/60 font-mono truncate">
                      CID: {submission.proofCID}
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Viewer de Vídeo com Overlay */}
          <div className="lg:col-span-2">
            {selectedSubmission ? (
              <Card>
                <div className="relative">
                  {/* Viewer de Vídeo */}
                  <div className="relative bg-protocol rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '16/9' }}>
                    {videoUrl ? (
                      <video
                        src={videoUrl}
                        controls
                        className="w-full h-full"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-arena">
                          <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <p className="text-sm">Carregando vídeo...</p>
                        </div>
                      </div>
                    )}

                    {/* Overlay de Decisão */}
                    {!isPlaying && (
                      <div className="absolute inset-0 bg-gradient-to-t from-protocol/90 via-protocol/50 to-transparent flex items-end justify-center p-6">
                        <div className="w-full max-w-md space-y-4">
                          {/* Informações */}
                          <div className="bg-arena/95 rounded-lg p-4 mb-4">
                            <p className="text-sm font-semibold text-protocol mb-1">
                              Desafio #{selectedSubmission.challengeId}
                            </p>
                            <p className="text-xs text-protocol/70 font-mono">
                              Atleta: {selectedSubmission.athlete}
                            </p>
                            <a
                              href={videoUrl || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-token hover:underline mt-2 inline-flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Ver no IPFS
                            </a>
                          </div>

                          {/* Botões de Decisão */}
                          <div className="flex gap-3">
                            <Button
                              variant="primary"
                              className="flex-1"
                              onClick={() => handleVote(
                                selectedSubmission.challengeId,
                                selectedSubmission.athlete,
                                true
                              )}
                            >
                              <CheckCircle className="w-5 h-5 mr-2" />
                              Aprovar (Rep)
                            </Button>
                            <Button
                              variant="secondary"
                              className="flex-1"
                              onClick={() => handleVote(
                                selectedSubmission.challengeId,
                                selectedSubmission.athlete,
                                false
                              )}
                            >
                              <XCircle className="w-5 h-5 mr-2" />
                              Rejeitar (No-Rep)
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Instruções */}
                  <div className="p-4 bg-arena/50 rounded-lg border border-token/20">
                    <p className="text-sm text-protocol/70">
                      <strong>Como validar:</strong> Assista ao vídeo completo e avalie se o atleta
                      completou o desafio conforme as regras. Clique em "Aprovar" se a prova é válida
                      ou "Rejeitar" se não atende aos critérios.
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="text-center py-20 text-protocol/60">
                  <p className="text-xl mb-2">Selecione uma submissão</p>
                  <p className="text-sm">Escolha uma submissão da lista para começar a validação</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

