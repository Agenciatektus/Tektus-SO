import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function BaseConhecimento() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Base de Conhecimento</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Artigos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Artigos de conhecimento.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tutoriais</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Tutoriais e guias.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>FAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Perguntas frequentes.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default BaseConhecimento;
export { BaseConhecimento }; 