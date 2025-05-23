import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Relatorios() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Relatórios</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Gerenciais</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Relatórios gerenciais e estratégicos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Operacionais</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Relatórios operacionais e táticos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Personalizados</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Relatórios personalizados e sob demanda.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 