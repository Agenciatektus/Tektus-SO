import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Projetos() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Projetos</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Em Andamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Projetos em desenvolvimento.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Planejados</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Projetos planejados para o futuro.</p>
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