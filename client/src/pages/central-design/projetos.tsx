import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjetosDesign() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Projetos de Design</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Projetos de design em desenvolvimento.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Em Revisão</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Projetos em fase de revisão.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Concluídos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Histórico de projetos concluídos.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 