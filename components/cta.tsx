import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTA() {
  return (
    <section className="bg-[#141624] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl lg:text-5xl font-bold text-white">Ready to streamline your business?</h2>
          <p className="text-xl text-[#a1a1aa] leading-relaxed">
            Join thousands of businesses that trust StreamLine to optimize their operations and accelerate growth. Start
            your free trial today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-[#4b6bfb] hover:bg-[#3b5beb] text-white">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[#3b3c4a] text-white hover:bg-[#3b3c4a] bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-[#a1a1aa]">
            <div className="flex items-center space-x-2">
              <span>✓</span>
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✓</span>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>✓</span>
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
