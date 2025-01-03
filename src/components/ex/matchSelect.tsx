import {
    Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent
} from "@/components/ui/card.tsx";

function matchSelect() {
    return (
        <Card>
            <CardHeader>
                <div>
                    <CardTitle><p>CARD TITLE</p></CardTitle>
                    <CardDescription><p>Card Description</p></CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p>MAIN CONTENT</p>
            </CardContent>
            <CardFooter>
                <p>CARD FOOTER</p>
                <button>CLOSE</button>
            </CardFooter>
        </Card>
    )
}

export default matchSelect;