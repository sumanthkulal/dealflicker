import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "Found amazing deals here! The reviews are honest and helpful.",
    product: "AirPods Pro"
  },
  {
    name: "Mike Chen",
    rating: 5,
    comment: "Best affiliate site I've used. Great product recommendations!",
    product: "Samsung TV"
  },
  {
    name: "Lisa Rodriguez",
    rating: 5,
    comment: "Saved me hours of research. The comparisons are spot-on.",
    product: "Instant Pot"
  }
];

const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
    />
  ));
};

const Testimonials = () => {
  return (
    <section id="reviews" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600">Real feedback from satisfied customers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="flex">{renderStars(testimonial.rating)}</div>
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">Purchased: {testimonial.product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;