import {
  Accordion,
  AccordionAction,
  AccordionContent,
  AccordionIcon,
  AccordionItem,
  AccordionTitle,
} from "keep-react";

export const AccordionComponent = () => {
  return (
    <section
      id="home"
      className="w-full max-w-4xl mx-auto mt-28 mb-12 px-8 py-6 font-poppins text-slateGray"
    >
      <Accordion flush={true} type="single" collapsible>
        <AccordionItem value="value-1">
          <AccordionAction>
            <AccordionTitle className="first-letter:text-slateGray text-lg font-semibold tracking-wide">
              Q. What is Adventure Planner?
            </AccordionTitle>
            <AccordionIcon />
          </AccordionAction>
          <AccordionContent>
            Adventure Planner is a travel planning app that helps users organize
            every aspect of their trip in one place, from finding flights and
            hotels to creating personalized to-do lists for activities and
            attractions.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="value-2">
          <AccordionAction>
            <AccordionTitle className="first-letter:text-slateGray text-lg font-semibold tracking-wide">
              Q. How does Adventure Planner help with trip planning?
            </AccordionTitle>
            <AccordionIcon />
          </AccordionAction>
          <AccordionContent>
            The app allows you to search for and book flights, hotels, and
            activities while also giving you the ability to create a custom
            itinerary and to-do list for each destination.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="value-3">
          <AccordionAction>
            <AccordionTitle className="first-letter:text-slateGray text-lg font-semibold tracking-wide">
              Q. Can I add my own activities to the plan?
            </AccordionTitle>
            <AccordionIcon />
          </AccordionAction>
          <AccordionContent>
            Yes! You can manually add activities or sights that you want to
            visit to your personalized to-do list for each trip.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="value-4">
          <AccordionAction>
            <AccordionTitle className="first-letter:text-slateGray text-lg font-semibold tracking-wide">
              Q. Is Adventure Planner free to use?
            </AccordionTitle>
            <AccordionIcon />
          </AccordionAction>
          <AccordionContent>
            The basic features of Adventure Planner are free, but we may offer
            premium options with additional features in the future.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="value-5">
          <AccordionAction>
            <AccordionTitle className="first-letter:text-slateGray text-lg font-semibold tracking-wide">
              Q. Can I use Adventure Planner offline?
            </AccordionTitle>
            <AccordionIcon />
          </AccordionAction>
          <AccordionContent>
            While some features require an internet connection, your saved trip
            details and itinerary will be accessible offline once synced.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="value-6">
          <AccordionAction>
            <AccordionTitle className="first-letter:text-slateGray text-lg font-semibold tracking-wide">
              Q. What kind of destinations can I plan trips to?
            </AccordionTitle>
            <AccordionIcon />
          </AccordionAction>
          <AccordionContent>
            Adventure Planner supports planning trips to destinations all around
            the world. You can search for flights, hotels, and activities in
            most major cities and tourist destinations.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="value-7">
          <AccordionAction>
            <AccordionTitle className="first-letter:text-slateGray text-lg font-semibold tracking-wide">
              Q. Can I track expenses during my trip?
            </AccordionTitle>
            <AccordionIcon />
          </AccordionAction>
          <AccordionContent>
            Currently, Adventure Planner focuses on organizing itineraries and
            to-do lists. However, you can manually note expenses in your plan,
            and we may add dedicated budgeting features in the future.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="value-8">
          <AccordionAction>
            <AccordionTitle className="first-letter:text-slateGray text-lg font-semibold tracking-wide">
              Q. How do I start planning a trip with Adventure Planner?
            </AccordionTitle>
            <AccordionIcon />
          </AccordionAction>
          <AccordionContent>
            Simply create an account, input your destination, and start by
            searching for flights and accommodations. You can then add
            activities, attractions, and create a personalized to-do list to
            build your itinerary.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="value-9">
          <AccordionAction>
            <AccordionTitle className="first-letter:text-slateGray text-lg font-semibold tracking-wide">
              Q. What happens if my flight or hotel booking is canceled?
            </AccordionTitle>
            <AccordionIcon />
          </AccordionAction>
          <AccordionContent>
            Adventure Planner is a planning tool, but we are not responsible for
            any issues related to flight cancellations, hotel bookings, or other
            reservations. All bookings are handled through third-party
            providers, and any problems must be resolved directly with them.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="value-10">
          <AccordionAction>
            <AccordionTitle className="first-letter:text-slateGray text-lg font-semibold tracking-wide">
              Q. Does Adventure Planner work on both mobile and desktop?
            </AccordionTitle>
            <AccordionIcon />
          </AccordionAction>
          <AccordionContent>
            Yes, Adventure Planner is available as both a mobile app and a web
            platform, so you can access your travel plans from any device.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
};
