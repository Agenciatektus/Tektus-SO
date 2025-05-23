import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GestaoAnunciosMeta() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Gestão de Anúncios - Meta</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Campanhas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerenciamento de campanhas Meta Ads.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Anúncios</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerenciamento de anúncios e criativos.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Públicos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerenciamento de públicos-alvo.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}