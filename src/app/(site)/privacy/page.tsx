import { BlueLink, Bold, Heading } from "@/components/Global/BasicComponents";
import Link from "next/link";
import { NextResponse } from "next/server";
import React from "react";

const PrivacyPage = () => {
  return (
    <main>
      <section className="p-[1rem] lg:p-[2rem] space-y-4 max-w-6xl mx-auto">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl text-indigo-800 font-semibold text-center">
              Privacy Policy
            </h1>
            <div className="h-1 w-10 bg-emerald-500 mx-auto"></div>
          </div>

          <h1 className="text-neutral-400 ">Last updated: May 03, 2024</h1>

          <div className="space-y-4">
            <h1 className="text-3xl text-indigo-800 font-semibold ">
              Introduction to Privacy Policy
            </h1>
            <div className="h-1 w-10 bg-emerald-500"></div>
          </div>

          <div className="space-y-4 text-neutral-500">
            <h1 className="text-neutral-500">
              This privacy notice for{" "}
              <span className="font-bold">EOMR INDIA PVT LTD</span> (
              <span className="font-bold">
                &apos;we&apos;, &apos;us&apos;, or &apos;our&apos;
              </span>
              ), describes how and why we might collect, store, use, and/or
              share (&apos;<span className="font-bold">process</span>&apos;)
              your information when you use our services (&apos;
              <span className="font-bold">Services</span>&apos;), such as when
              you:
            </h1>
            <ul className="list-disc list-inside">
              <li className="text-neutral-500">
                Visit our website at{" "}
                <Link
                  href="https://eomr.in"
                  className="underline text-indigo-700 underline-offset-4"
                  target="_blank"
                >
                  https://eomr.in
                </Link>{" "}
                , or any website of ours that links to this privacy notice
              </li>
              <li className="text-neutral-500">
                Engage with us in other related ways, including any sales,
                marketing, or events
              </li>
            </ul>
            <h1>
              <span className="font-bold">Questions or concerns?</span> Reading
              this privacy notice will help you understand your privacy rights
              and choices. If you do not agree with our policies and practices,
              please do not use our Services. If you still have any questions or
              concerns, please contact us at{" "}
              <Link
                href="mailto:contact@eomr.in"
                className="underline text-indigo-700 underline-offset-4"
                target="_blank"
              >
                contact@eomr.in
              </Link>
              .
            </h1>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl text-indigo-800 font-semibold ">
                TABLE OF CONTENTS
              </h1>
              <div className="h-1 w-10 bg-emerald-500 "></div>
            </div>
            <div>
              <ul className="list-inside pl-2">
                <li>
                  <Link
                    href="#1"
                    className="underline text-indigo-700 underline-offset-4"
                  >
                    1. WHAT INFORMATION DO WE COLLECT?
                  </Link>
                </li>
                <li>
                  <Link
                    href="#2"
                    className="underline text-indigo-700 underline-offset-4"
                  >
                    2. HOW DO WE PROCESS YOUR INFORMATION?
                  </Link>
                </li>
                <li>
                  <Link
                    href="#3"
                    className="underline text-indigo-700 underline-offset-4"
                  >
                    3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                  </Link>
                </li>
                <li>
                  <Link
                    href="#4"
                    className="underline text-indigo-700 underline-offset-4"
                  >
                    4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                  </Link>
                </li>
                <li>
                  <Link
                    href="#5"
                    className="underline text-indigo-700 underline-offset-4"
                  >
                    5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                  </Link>
                </li>
                <li>
                  <Link
                    href="#6"
                    className="underline text-indigo-700 underline-offset-4"
                  >
                    6. HOW LONG DO WE KEEP YOUR INFORMATION?
                  </Link>
                </li>
                <li>
                  <Link
                    href="#7"
                    className="underline text-indigo-700 underline-offset-4"
                  >
                    7. HOW DO WE KEEP YOUR INFORMATION SAFE?
                  </Link>
                </li>
                <li>
                  <Link
                    href="#8"
                    className="underline text-indigo-700 underline-offset-4"
                  >
                    8. DO WE COLLECT INFORMATION FROM MINORS?
                  </Link>
                </li>
                <li>
                  <Link
                    href="#9"
                    className="underline text-indigo-700 underline-offset-4"
                  >
                    9. WHAT ARE YOUR PRIVACY RIGHTS?
                  </Link>
                </li>
                <li>
                  <Link
                    href="#10"
                    className="underline text-indigo-700 underline-offset-4"
                  >
                    10. CONTROLS FOR DO-NOT-TRACK FEATURES
                  </Link>
                </li>
                <li>
                  <Link
                    href="#11"
                    className="underline text-indigo-700 underline-offset-4"
                  >
                    11. DO WE MAKE UPDATES TO THIS NOTICE?
                  </Link>
                </li>
                <li>
                  <Link
                    href="#12"
                    className="underline text-indigo-700 underline-offset-4"
                  >
                    12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                  </Link>
                </li>
                <li>
                  <Link
                    href="#13"
                    className="underline text-indigo-700 underline-offset-4"
                  >
                    13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE
                    COLLECT FROM YOU?
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-8">
              <div className="space-y-4" id="1">
                <h1 className="text-3xl text-indigo-800 font-semibold ">
                  1. WHAT INFORMATION DO WE COLLECT?
                </h1>
                <div className="h-1 w-10 bg-emerald-500 "></div>
                <h1 className="text-xl text-indigo-800 font-semibold ">
                  Personal information you disclose to us
                </h1>
                <h1>
                  <span className="font-semibold">In Short:</span> We collect
                  personal information that you provide to us.
                </h1>
                <h1>
                  We collect personal information that you voluntarily provide
                  to us when you register on the Services, express an interest
                  in obtaining information about us or our products and
                  Services, when you participate in activities on the Services,
                  or otherwise when you contact us.
                </h1>
                <h1>
                  <span className="font-semibold">
                    Personal Information Provided by You :
                  </span>{" "}
                  The personal information that we collect depends on the
                  context of your interactions with us and the Services, the
                  choices you make, and the products and features you use. The
                  personal information we collect may include the following:
                </h1>
                <ul className="list-disc list-inside">
                  <li>names</li>
                  <li>phone numbers</li>
                  <li>email addresses</li>
                  <li>social media usernames</li>
                </ul>
                <h1>
                  <span className="font-semibold">
                    Sensitive Information :{" "}
                  </span>
                  We do not process sensitive information.
                </h1>
                <h1>
                  <span className="font-semibold">Payment Data :</span> We may
                  collect data necessary to process your payment if you make
                  purchases, such as your payment instrument number, and the
                  security code associated with your payment instrument. All
                  payment data is stored by Razorpay. You may find their privacy
                  notice link(s) here:
                  <Link
                    href="https://razorpay.com/privacy/"
                    className="underline text-indigo-700 underline-offset-4"
                    target="_blank"
                  >
                    https://razorpay.com/privacy/
                  </Link>
                  .
                </h1>
                <h1>
                  <span className="font-semibold">
                    Social Media Login Data :{" "}
                  </span>{" "}
                  We may provide you with the option to register with us using
                  your existing social media account details, like your
                  Facebook, Twitter, or other social media account. If you
                  choose to register in this way, we will collect the
                  information described in the section called &apos;
                  <Link
                    href="#5"
                    className="underline text-indigo-700 underline-offset-4"
                  >
                    HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                  </Link>
                  &apos; below.
                </h1>
                <h1>
                  All personal information that you provide to us must be true,
                  complete, and accurate, and you must notify us of any changes
                  to such personal information. Information automatically
                  collected
                </h1>
                <h1>Information automatically collected</h1>
                <h1>
                  In Short: Some information — such as your Internet Protocol
                  (IP) address and/or browser and device characteristics — is
                  collected automatically when you visit our Services.
                </h1>
                <h1>
                  We automatically collect certain information when you visit,
                  use, or navigate the Services. This information does not
                  reveal your specific identity (like your name or contact
                  information) but may include device and usage information,
                  such as your IP address, browser and device characteristics,
                  operating system, language preferences, referring URLs, device
                  name, country, location, information about how and when you
                  use our Services, and other technical information. This
                  information is primarily needed to maintain the security and
                  operation of our Services, and for our internal analytics and
                  reporting purposes.
                </h1>
                <h1>
                  Like many businesses, we also collect information through
                  cookies and similar technologies.
                </h1>
                <h1>The information we collect includes:</h1>
                <ul className="list-disc list-inside">
                  <li>
                    Log and Usage Data. Log and usage data is service-related,
                    diagnostic, usage, and performance information our servers
                    automatically collect when you access or use our Services
                    and which we record in log files. Depending on how you
                    interact with us, this log data may include your IP address,
                    device information, browser type, and settings and
                    information about your activity in the Services (such as the
                    date/time stamps associated with your usage, pages and files
                    viewed, searches, and other actions you take such as which
                    features you use), device event information (such as system
                    activity, error reports (sometimes called &apos;crash
                    dumps&apos;), and hardware settings).
                  </li>
                </ul>
                <h1>Information collected from other sources</h1>
                <h1>
                  In Short: We may collect limited data from public databases,
                  marketing partners, social media platforms, and other outside
                  sources.
                </h1>
                <h1>
                  In order to enhance our ability to provide relevant marketing,
                  offers, and services to you and update our records, we may
                  obtain information about you from other sources, such as
                  public databases, joint marketing partners, affiliate
                  programs, data providers, social media platforms, and from
                  other third parties. This information includes mailing
                  addresses, job titles, email addresses, phone numbers, intent
                  data (or user behaviour data), Internet Protocol (IP)
                  addresses, social media profiles, social media URLs, and
                  custom profiles, for purposes of targeted advertising and
                  event promotion. If you interact with us on a social media
                  platform using your social media account (e.g. Facebook or
                  Twitter), we receive personal information about you such as
                  your name, email address, and gender. Any personal information
                  that we collect from your social media account depends on your
                  social media account&apos;s privacy settings.
                </h1>
              </div>

              <div className="space-y-4" id="2">
                <h1 className="text-3xl text-indigo-800 font-semibold ">
                  2. HOW DO WE PROCESS YOUR INFORMATION?
                </h1>
                <div className="h-1 w-10 bg-emerald-500 "></div>
                <h1>
                  <span className="font-semibold">In Short: </span> We process
                  your information to provide, improve, and administer our
                  Services, communicate with you, for security and fraud
                  prevention, and to comply with law. We may also process your
                  information for other purposes with your consent.
                </h1>
                <h1 className="font-semibold">
                  We process your personal information for a variety of reasons,
                  depending on how you interact with our Services, including:
                </h1>
                <ul className="list-disc list-inside">
                  <li>
                    <span className="font-semibold">
                      To facilitate account creation and authentication and
                      otherwise manage user accounts.
                    </span>{" "}
                    We may process your information so you can create and log in
                    to your account, as well as keep your account in working
                    order.
                  </li>
                  <li>
                    <span className="font-semibold">
                      To deliver and facilitate delivery of services to the
                      user.{" "}
                    </span>
                    We may process your information to provide you with the
                    requested service.
                  </li>
                  <li>
                    <span className="font-semibold">
                      To identify usage trends.
                    </span>
                    We may process information about how you use our Services to
                    better understand how they are being used so we can improve
                    them.
                  </li>
                  <li>
                    <span className="font-semibold">
                      To comply with our legal obligations.
                    </span>
                    We may process your information to comply with our legal
                    obligations, respond to legal requests, and exercise,
                    establish, or defend our legal rights.
                  </li>
                </ul>
              </div>

              <div className="space-y-4" id="3">
                <h1 className="text-3xl text-indigo-800 font-semibold ">
                  3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                </h1>
                <div className="h-1 w-10 bg-emerald-500 "></div>
                <h1>
                  <span className="font-semibold">In Short: </span> We may share
                  information in specific situations described in this section
                  and/or with the following third parties.
                </h1>
                <h1 className="font-semibold">
                  We may need to share your personal information in the
                  following situations:
                </h1>
                <ul className="list-disc list-inside">
                  <li>
                    <span className="font-semibold">Business Transfers. </span>{" "}
                    We may share or transfer your information in connection
                    with, or during negotiations of , any merger, sale of
                    company assets, financing, or acquisition of all or a
                    portion of our business to another company.
                  </li>

                  <li>
                    <span className="font-semibold">
                      When we use Google Analytics.
                    </span>{" "}
                    We may share your information with Google Analytics to track
                    and analyse the use of the Services. The Google Analytics
                    Advertising Features that we may use include: Google
                    Analytics Demographics and Interests Reporting. To opt out
                    of being tracked by Google Analytics across the Services,
                    visit{" "}
                    <Link
                      href="https://tools.google.com/dlpage/gaoptout"
                      className="underline text-indigo-700 underline-offset-4"
                      target="_blank"
                    >
                      https://tools.google.com/dlpage/gaoptout
                    </Link>
                    . You can opt out of Google Analytics Advertising Features
                    through Ads Settings and Ad Settings for mobile apps. Other
                    opt out means include{" "}
                    <Link
                      href="http://optout.networkadvertising.org/"
                      className="underline text-indigo-700 underline-offset-4"
                      target="_blank"
                    >
                      http://optout.networkadvertising.org/
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="http://www.networkadvertising.org/mobile-choice"
                      className="underline text-indigo-700 underline-offset-4"
                      target="_blank"
                    >
                      http://www.networkadvertising.org/mobile-choice
                    </Link>
                    . For more information on the privacy practices of Google,
                    please visit the{" "}
                    <Link
                      href="https://policies.google.com/privacy"
                      className="underline text-indigo-700 underline-offset-4"
                      target="_blank"
                    >
                      Google Privacy & Terms page
                    </Link>
                    .
                  </li>
                </ul>
              </div>

              <div className="space-y-4" id="4">
                <Heading>
                  4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                </Heading>
                <h1>
                  <Bold>In Short:</Bold>We may use cookies and other tracking
                  technologies to collect and store your information.
                </h1>
                <h1>
                  We may use cookies and similar tracking technologies (like web
                  beacons and pixels) to access or store information. Specific
                  information about how we use such technologies and how you can
                  refuse certain cookies is set out in our Cookie Notice.
                </h1>
              </div>

              <div className="space-y-4" id="5">
                <Heading>5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</Heading>
                <h1>
                  <Bold>In Short: </Bold>If you choose to register or log in to
                  our Services using a social media account, we may have access
                  to certain information about you.
                </h1>
                <h1>
                  Our Services offer you the ability to register and log in
                  using your third-party social media account details (like your
                  Facebook or Twitter logins). Where you choose to do this, we
                  will receive certain profile information about you from your
                  social media provider. The profile information we receive may
                  vary depending on the social media provider concerned, but
                  will often include your name, email address, friends list, and
                  profile picture, as well as other information you choose to
                  make public on such a social media platform.
                </h1>
                <h1>
                  We will use the information we receive only for the purposes
                  that are described in this privacy notice or that are
                  otherwise made clear to you on the relevant Services. Please
                  note that we do not control, and are not responsible for,
                  other uses of your personal information by your third-party
                  social media provider. We recommend that you review their
                  privacy notice to understand how they collect, use, and share
                  your personal information, and how you can set your privacy
                  preferences on their sites and apps.
                </h1>
              </div>

              <div className="space-y-4" id="6">
                <Heading>6. HOW LONG DO WE KEEP YOUR INFORMATION?</Heading>
                <h1>
                  <Bold>In Short: </Bold>We keep your information for as long as
                  necessary to fulfill the purposes outlined in this privacy
                  notice unless otherwise required by law.
                </h1>
                <h1>
                  We will only keep your personal information for as long as
                  necessary to fulfill the purposes outlined in this privacy
                  notice, unless a longer retention period is required or
                  permitted by law (such as tax, accounting or other legal
                  requirements). No purpose in this notice will require us to
                  retain your personal information except as described in this
                  privacy notice.
                </h1>
                <h1>
                  When we have no ongoing legitimate business need to process
                  your personal information, we will either delete or anonymise
                  such information, or, if this is not possible (for example,
                  because your personal information has been stored in backup
                  archives), then we will securely store your personal
                  information and isolate it from any further processing until
                  deletion is possible.
                </h1>
              </div>

              <div className="space-y-4" id="7">
                <Heading>7. HOW DO WE KEEP YOUR INFORMATION SAFE?</Heading>
                <h1>
                  <Bold>In Short: </Bold>We aim to protect your personal
                  information through a system of organizational and technical
                  security measures.
                </h1>
                <h1>
                  We have implemented appropriate and reasonable technical and
                  organisational security measures designed to protect the
                  security of any personal information we process. However,
                  despite our safeguards and efforts to secure your information,
                  no electronic transmission over the Internet or information
                  storage technology can be guaranteed to be 100% secure, so we
                  cannot promise or guarantee that hackers, cybercriminals, or
                  other unauthorised third parties will not be able to defeat
                  our security and improperly collect, access, steal, or modify
                  your information. Although we will do our best to protect your
                  personal information, transmission of personal information to
                  and from our Services is at your own risk. You should only
                  access the Services within a secure environment.
                </h1>
              </div>

              <div className="space-y-4" id="8">
                <Heading>8. DO WE COLLECT INFORMATION FROM MINORS?</Heading>
                <h1>
                  <Bold>In Short: </Bold>We do not knowingly collect data from
                  or market to children under 18 years of age.
                </h1>
                <h1>
                  We do not knowingly solicit data from or market to children
                  under 18 years of age. By using the Services, you represent
                  that you are at least 18 or that you are the parent or
                  guardian of such a minor and consent to such minor
                  dependent&apos;s use of the Services. If we learn that
                  personal information from users less than 18 years of age has
                  been collected, we will deactivate the account and take
                  reasonable measures to promptly delete such data from our
                  records. If you become aware of any data we may have collected
                  from children under age 18, please contact us at{" "}
                  <BlueLink href="mailto:dpo@eomr.in">dpo@eomr.in </BlueLink>.
                </h1>
              </div>

              <div className="space-y-4" id="9">
                <Heading>9. WHAT ARE YOUR PRIVACY RIGHTS?</Heading>
                <h1>
                  <Bold>In Short: </Bold>You may review, change, or terminate
                  your account at any time.
                </h1>
                <h1>
                  <Bold>Withdrawing your consent: </Bold>
                  If we are relying on your consent to process your personal
                  information, which may be express and/or implied consent
                  depending on the applicable law, you have the right to
                  withdraw your consent at any time. You can withdraw your
                  consent at any time by contacting us by using the contact
                  details provided in the section{" "}
                  <BlueLink href="#12">
                    &apos;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&apos;{" "}
                  </BlueLink>
                  below.
                </h1>
                <h1>
                  However, please note that this will not affect the lawfulness
                  of the processing before its withdrawal nor, when applicable
                  law allows, will it affect the processing of your personal
                  information conducted in reliance on lawful processing grounds
                  other than consent.
                </h1>

                <Heading>Account Information </Heading>
                <h1>
                  If you would at any time like to review or change the
                  information in your account or terminate your account, you
                  can:
                </h1>
                <ul className="list-disc list-inside">
                  <li>Contact us using the contact information provided.</li>
                  <li>contact@eomr.in</li>
                  <li>help@eomr.in</li>
                </ul>

                <h1>
                  Upon your request to terminate your account, we will
                  deactivate or delete your account and information from our
                  active databases. However, we may retain some information in
                  our files to prevent fraud, troubleshoot problems, assist with
                  any investigations, enforce our legal terms and/or comply with
                  applicable legal requirements.
                </h1>
                <h1>
                  <Bold>Cookies and similar technologies: </Bold> Most Web
                  browsers are set to accept cookies by default. If you prefer,
                  you can usually choose to set your browser to remove cookies
                  and to reject cookies. If you choose to remove cookies or
                  reject cookies, this could affect certain features or services
                  of our Services.
                </h1>
                <h1>
                  If you have questions or comments about your privacy rights,
                  you may email us at contact@eomr.in.
                </h1>
              </div>

              <div className="space-y-4" id="10">
                <Heading>10. CONTROLS FOR DO-NOT-TRACK FEATURES</Heading>
                <h1>
                  Most web browsers and some mobile operating systems and mobile
                  applications include a Do-Not-Track (&apos;DNT&apos;) feature
                  or setting you can activate to signal your privacy preference
                  not to have data about your online browsing activities
                  monitored and collected. At this stage no uniform technology
                  standard for recognising and implementing DNT signals has been
                  finalised. As such, we do not currently respond to DNT browser
                  signals or any other mechanism that automatically communicates
                  your choice not to be tracked online. If a standard for online
                  tracking is adopted that we must follow in the future, we will
                  inform you about that practice in a revised version of this
                  privacy notice.
                </h1>
              </div>

              <div className="space-y-4" id="11">
                <Heading>11. DO WE MAKE UPDATES TO THIS NOTICE?</Heading>
                <h1>
                  <Bold>In Short: </Bold> Yes, we will update this notice as
                  necessary to stay compliant with relevant laws.
                </h1>
                <h1>
                  We may update this privacy notice from time to time. The
                  updated version will be indicated by an updated
                  &apos;Revised&apos; date and the updated version will be
                  effective as soon as it is accessible. If we make material
                  changes to this privacy notice, we may notify you either by
                  prominently posting a notice of such changes or by directly
                  sending you a notification. We encourage you to review this
                  privacy notice frequently to be informed of how we are
                  protecting your information.
                </h1>
              </div>

              <div className="space-y-4" id="12">
                <Heading>12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</Heading>
                <h1>
                  If you have questions or comments about this notice, you may
                  contact our Data Protection Officer (DPO), Mr. Surya M, by
                  email at dpo@eomr.in, by phone at 8955705452, or contact us by
                  post at:
                </h1>
                <div className="max-w-md">
                  <h1>EOMR INDIA PVT LTD </h1>
                  <h1>Mr. Surya M</h1>
                  <h1>
                    1502, 22nd Main Road, Agara Village, 1st Sector, HSR Layout,
                    Bengaluru, Karnataka 560102 India
                  </h1>
                </div>
              </div>

              <div className="space-y-4" id="13">
                <Heading>
                  13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT
                  FROM YOU?
                </Heading>
                <h1>
                  Based on the applicable laws of your country, you may have the
                  right to request access to the personal information we collect
                  from you, change that information, or delete it. To request to
                  review, update, or delete your personal information, please
                  mail us at{" "}
                  <BlueLink href="mailto:contact@eomr.in">
                    contact@eomr.in
                  </BlueLink>
                  .
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPage;
