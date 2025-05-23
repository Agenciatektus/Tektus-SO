import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Juridico() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Jurídico</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Contratos de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie contratos e documentos de clientes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contratos de Funcionários</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie contratos e documentos de funcionários.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Templates de Contrato</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acesse e gerencie templates de contratos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Termos de Uso</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie termos de uso e políticas.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Política de Privacidade</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie políticas de privacidade e LGPD.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 