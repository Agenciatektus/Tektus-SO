import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function PainelDesempenhoTarefas() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Painel de Desempenho - Tarefas</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Produtividade</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas de produtividade da equipe.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Eficiência</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Taxa de conclusão de tarefas.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Qualidade</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas de qualidade do trabalho.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PainelDesempenhoTarefas;
export { PainelDesempenhoTarefas }; 