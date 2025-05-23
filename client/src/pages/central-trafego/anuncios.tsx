function Anuncios() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Anúncios</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Anúncios em exibição.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Desempenho</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Métricas de desempenho dos anúncios.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orçamento</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Gerenciamento de orçamento.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default Anuncios;
export { Anuncios }; 