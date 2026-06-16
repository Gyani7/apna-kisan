
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ProductCard() {
  return (
    <Card>
      <CardContent className="p-0">
        <img
          src="/placeholder.svg"
          alt="Product image"
          width={400}
          height={300}
          className="h-48 w-full rounded-t-lg object-cover"
        />
      </CardContent>
      <div className="p-4">
        <h3 className="text-lg font-semibold">Fresh Organic Tomatoes</h3>
        <p className="text-muted-foreground">₹50 per kg</p>
      </div>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">View Product</Button>
      </CardFooter>
    </Card>
  )
}
