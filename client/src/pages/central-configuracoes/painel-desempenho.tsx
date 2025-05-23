import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function PainelDesempenhoConfiguracoes() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Painel de Desempenho - Configurações</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Configurações do sistema.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerenciamento de usuários.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Integrações</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Configurações de integrações.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PainelDesempenhoConfiguracoes;
export { PainelDesempenhoConfiguracoes }; 