import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Administracao() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Administração Agência</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Documentos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acesse e gerencie documentos administrativos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Organograma</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visualize a estrutura organizacional da empresa.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Parceiros</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie informações sobre parceiros e fornecedores.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Identidade da Marca</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acesse materiais e diretrizes da marca.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Links e Ferramentas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acesse links úteis e ferramentas da empresa.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Automações (N8N)</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie automações e fluxos de trabalho.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Integrações</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerencie integrações entre sistemas e ferramentas.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 