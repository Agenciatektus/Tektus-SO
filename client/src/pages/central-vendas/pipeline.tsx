function PipelineVendas() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Pipeline de Vendas</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerenciamento de leads.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Oportunidades</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Oportunidades em andamento.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fechamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Negociações em fase de fechamento.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default PipelineVendas;
export { PipelineVendas }; 