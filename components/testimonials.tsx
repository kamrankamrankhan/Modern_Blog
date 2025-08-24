import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechStart",
    content:
      "StreamLine transformed our operations completely. We've seen a 40% increase in productivity since implementation.",
    avatar: "/professional-woman-ceo.png",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Operations Director, GrowthCorp",
    content: "The analytics features are incredible. We can now make data-driven decisions faster than ever before.",
    avatar: "/professional-operations-director.png",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Founder, InnovateLab",
    content: "Best investment we've made. The ROI was evident within the first month of using StreamLine.",
    avatar: "/professional-woman-founder-headshot.png",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#ffffff] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#141624]">Loved by thousands of businesses</h2>
          <p className="text-xl text-[#52525b] max-w-3xl mx-auto">
            See what our customers have to say about their experience with StreamLine
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#f6f6f7] p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-[#52525b] mb-6 leading-relaxed">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-[#141624]">{testimonial.name}</h4>
                  <p className="text-[#a1a1aa] text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
