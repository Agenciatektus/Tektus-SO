import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function PipelineConteudo() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Pipeline de Conteúdo</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Em Produção</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Conteúdos em produção.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Em Revisão</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Conteúdos em fase de revisão.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Agendados</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Conteúdos agendados para publicação.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PipelineConteudo;
export { PipelineConteudo }; 