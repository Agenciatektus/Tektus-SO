import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CalendarioPublicacao() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Calendário de Publicação</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Agenda Mensal</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Publicações do mês.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Agenda Semanal</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Publicações da semana.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Histórico</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Histórico de publicações.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CalendarioPublicacao;
export { CalendarioPublicacao }; 