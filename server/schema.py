import graphene


class Query(graphene.ObjectType):
    test = graphene.String(name=graphene.Argument(
        graphene.String))

    def resolve_test(self, args, context, info):
        return 'HorizonBlue'

schema = graphene.Schema(query=Query)
