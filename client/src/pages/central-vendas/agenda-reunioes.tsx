import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AgendaReunioes() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Agenda de Reuniões</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Reuniões Agendadas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visualize e gerencie reuniões futuras.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Histórico</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Histórico de reuniões realizadas.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Agenda</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Agende novas reuniões.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 