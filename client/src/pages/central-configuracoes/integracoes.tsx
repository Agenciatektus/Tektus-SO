import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Integracoes() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Integrações</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>APIs</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Configuração de APIs.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Webhooks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Configuração de webhooks.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tokens</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerenciamento de tokens.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Integracoes;
export { Integracoes }; 