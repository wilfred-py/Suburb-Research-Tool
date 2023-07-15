import { createClientComponentClient, createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function Test() {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase.storage.getBucket("summary_data");
    console.log(data);
    return <div></div>;
}
