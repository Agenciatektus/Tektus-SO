import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NPSTracker() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">NPS Tracker</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>NPS Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas atuais de satisfação do cliente.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Detratores</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Análise de clientes insatisfeitos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Promotores</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Análise de clientes satisfeitos.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 