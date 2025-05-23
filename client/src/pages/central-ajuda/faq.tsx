import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function FAQ() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">FAQ</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Geral</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Perguntas gerais.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Técnico</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Perguntas técnicas.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Suporte</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Perguntas sobre suporte.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FAQ;
export { FAQ }; 