// 1. ربط السيرفر بمشروعك (rex-chat)
const supabaseUrl = 'https://ziuinockjozecynqrkxu.supabase.co';
const supabaseKey = 'sb_publishable_RN3kAgfGkqJyI5AodbCGmw_GVDN4_GVDN4'; // المفتاح اللي كان في صورتك
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// 2. وظيفة استقبال الرسائل فوراً (Real-time)
_supabase
  .channel('public:messages')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
    const div = document.getElementById('messagesDiv');
    if(div) {
        const msg = document.createElement('p');
        msg.innerHTML = <b>${payload.new.sender_name}:</b> ${payload.new.content};
        div.appendChild(msg);
        div.scrollTop = div.scrollHeight; // ينزل تحت تلقائياً
    }
  })
  .subscribe();

// 3. وظيفة إرسال الرسالة لما تضغط الزر
async function send() {
    const input = document.getElementById('msgInput');
    const text = input.value;
    
    if (text.trim() !== "") {
        const { error } = await _supabase.from('messages').insert([
            { content: text, sender_name: 'REX User' }
        ]);
        
        if (!error) input.value = ""; // يمسح المربع بعد ما ترسل
    }
}
