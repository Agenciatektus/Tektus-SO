import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CentralTarefas() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Central de Tarefas</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Painel de Desempenho</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visualize o desempenho da equipe e métricas importantes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tarefas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie e acompanhe todas as tarefas da equipe.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 